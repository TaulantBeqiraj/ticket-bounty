import { act, useEffect, useRef } from "react"
import { ActionState } from "../utils/error-to-action-state"

type OnArgs = {
  actionState: ActionState
}

type UseActionFeedbackOptions = {
    onSuccess?: (onArgs: OnArgs) => void;
    onError?: (onArgs: OnArgs) => void;
  }

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  const prevTimestamp = useRef(actionState.timeStamp);
  const isUpdate = prevTimestamp.current !== actionState.timeStamp;

  useEffect(() => {
    if (!isUpdate) return;

    if(actionState.status === "SUCCESS") {
      options.onSuccess?.({actionState})
    }

    if(actionState.status === "ERROR") {
      options.onError?.({actionState})
    }

    prevTimestamp.current = actionState.timeStamp;
  }, [isUpdate, actionState, options])
}

export { useActionFeedback }