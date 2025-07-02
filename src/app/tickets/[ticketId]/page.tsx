import { notFound } from "next/navigation";
import { TicketItem } from "@/features/components/ticket-item";
import { getTicket } from "@/features/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({params}: TicketPageProps) => {
  const ticket = await getTicket((await params).ticketId)

  if(!ticket) {
    notFound();
  }
  
  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail={true}/>
    </div>
  )
}

export default TicketPage