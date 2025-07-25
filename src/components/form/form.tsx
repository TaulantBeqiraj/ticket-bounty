import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/error-to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  children: React.ReactNode;
  actionState: ActionState;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};


const Form = ({action, children, actionState, onSuccess, onError}: FormProps) => {

  useActionFeedback(actionState, {
    onSuccess: ({actionState}) => {
      actionState.message && toast.success(actionState.message);

      onSuccess?.(actionState);
    },
    onError: ({actionState}) => {
      actionState.message && toast.error(actionState.message);

      onError?.(actionState);
    }
  });
  
  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  )
}

export { Form };