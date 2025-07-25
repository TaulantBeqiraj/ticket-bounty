"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/error-to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verifyPasswordHash } from "@/features/password/utils/hash-and-verify";
import { createSession } from "@/lib/lucia";
import { generateRandomToken } from "@/utils/crypto";
import { setSessionCookie } from "@/utils/session-cookie";

const signInSchema = z.object({
  email: z.string().min(1, {message: "Is required"}).max(191).email(),
  password: z.string().min(6).max(191),
})

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const {email, password} = signInSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if(!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);
    
    await setSessionCookie(sessionToken, session.expiresAt);

  } catch(error) {
    return fromErrorToActionState(error, formData);
  }
  
  redirect(ticketsPath())
}