"use server";

import { TicketStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/error-to-action-state";
import { revalidatePath } from "next/cache";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try{
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      }});
    } catch(error) {
      return fromErrorToActionState(error);
    }

  revalidatePath(ticketsPath());
  return toActionState("SUCCESS", "Status Updated!");
}
