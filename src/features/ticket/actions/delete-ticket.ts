"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { setCookieByKey } from "./cookies";
import { fromErrorToActionState } from "@/components/form/utils/error-to-action-state";

export const deleteTicket = async (id: string) => {
  try {
    await prisma.ticket.delete({
      where: {
        id,
      }
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket Deleted");
  redirect(ticketsPath());
}