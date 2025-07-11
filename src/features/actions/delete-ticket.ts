"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";

export const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({
    where: {
      id: ticketId
    }
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
}