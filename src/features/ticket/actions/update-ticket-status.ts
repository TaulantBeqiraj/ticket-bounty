"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/error-to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  const {user} = await getAuthOrRedirect();

  try{
    //Authorization(only the owner of the ticket has the right to update status)
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

    //Update status implementation
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
