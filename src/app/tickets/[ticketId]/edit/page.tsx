import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketEditProps = {
  params: Promise<{
    ticketId: string
  }>
}

const TicketEditPage = async ({params}: TicketEditProps) => {

  const {ticketId} = await params;
  const ticket = await getTicket(ticketId);

  if(!ticket) {
    return notFound();
  } else {
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
}

export default TicketEditPage;