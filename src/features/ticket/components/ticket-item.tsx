import { Prisma } from "@prisma/client";
import clsx from "clsx";
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { ticketEditPath, ticketPath } from "@/paths"
import { toCurrencyFromCent } from "@/utils/currency";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle} from "../../../components/ui/card";
import { TICKET_ICONS} from "../constants"
import { TicketMoreMenu } from "./ticket-more-menu";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

type TicketProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true
        }
      }
    }
  }>;
  isDetail?: boolean;
};

const TicketItem = async ({ticket, isDetail}: TicketProps) => {
  const {user} = await getAuth();
  const isTicketOwner = isOwner(user, ticket)

  const detailButton = (      
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4"/>
      </Link>
    </Button>)

  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  const moreMenu = isTicketOwner ? (<TicketMoreMenu 
    ticket={ticket} 
    trigger={
      <Button variant="outline" size="icon" >
        <LucideMoreVertical className="h-4 w-4"/>
      </Button>
  }/>) : null;

  return (
    <div className={clsx("flex w-full gap-x-1",
      {"max-w-[420px]": !isDetail},
      {"max-w-[580px]": isDetail}
    )}>
      <Card key={ticket.id} className="w-full max-w-[420px]">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center font-bold truncate">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span>{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className={clsx("whitespace-break-spaces",
            {"line-clamp-3": !isDetail}
          )}>
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline} by {ticket.user.username}</p>
          <p className="text-sm text-muted-foreground">{toCurrencyFromCent(ticket.bounty)}</p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {editButton}
            {detailButton}
          </>
        )}
      </div>
    </div>
  )
}

export {TicketItem}