import { ZodError } from "zod"

export type ActionState = {
  status?: "SUCCESS" | "ERROR"
  message: string;
  fieldError: Record<string, string[] | undefined>;
  payload?: FormData;
  timeStamp: number
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldError: {},
  timeStamp: Date.now()
}

export const fromErrorToActionState = (error: unknown, formData?: FormData): ActionState => {
  if (error instanceof ZodError) {
    console.log("PO HIN 111")
    return {
      status: "ERROR",
      message: "",
      fieldError: error.flatten().fieldErrors,
      payload: formData,
      timeStamp: Date.now()
    }
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldError: {},
      payload: formData,
      timeStamp: Date.now()
    }
  } else {
    return {
      status: "ERROR", 
      message: "An unknown error occured",
      fieldError: {},
      payload: formData,
      timeStamp: Date.now()
    };
  }
}

export const toActionState = (status: ActionState["status"], message: string, formData?: FormData): ActionState => {
  return {
    status, 
    message, 
    payload: formData,
    fieldError: {}, 
    timeStamp: Date.now()
  }
}