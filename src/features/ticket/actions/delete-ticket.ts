"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/error-to-action-state";
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths";
import { setCookieByKey } from "./cookies";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

export const deleteTicket = async (id: string) => {
  const {user} = await getAuthOrRedirect();

  try {
    //Authorization
    if(id) {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id
        }
      });

      if(!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not Authorized");
      }
    }

    //Ticket deletion
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