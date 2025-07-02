"use client";

import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { LucideSquareArrowOutUpRight, LucideTrash } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { ticketPath } from "@/paths"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle} from "../../components/ui/card";
import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "./constants"


type TicketProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ticket, isDetail}: TicketProps) => {

  const detailButton = (      
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4"/>
      </Link>
    </Button>)

  const handleTicketDelete = async () => {
    await deleteTicket(ticket.id)
  }

  const deleteButton = (
    <Button variant="outline" size="icon" onClick={handleTicketDelete}>
      <LucideTrash className="h-4 w-4"/>
    </Button>
  )

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
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  )
}

export {TicketItem}