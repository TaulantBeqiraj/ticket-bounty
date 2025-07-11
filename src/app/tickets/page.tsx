
import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/features/components/spinner";
import { TicketList } from "@/features/components/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place"/>

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}

export default TicketsPage