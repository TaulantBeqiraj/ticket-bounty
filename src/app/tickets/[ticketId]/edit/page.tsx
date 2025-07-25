import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

type TicketEditProps = {
  params: Promise<{
    ticketId: string
  }>
}

const TicketEditPage = async ({params}: TicketEditProps) => {
  const {user} = await getAuth();
  const {ticketId} = await params;
  const ticket = await getTicket(ticketId);

  
  const isTicketFound = !!ticket
  const isTicketOwner = isOwner(user, ticket);
  
  if(!isTicketFound || !isTicketOwner) {
    return notFound();
  } 

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact 
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  )
}

export default TicketEditPage;