import { Button } from "@/components/ui/button";
import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
}
      
const SubmitButton = ({label}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return(
    <Button disabled={pending} type="submit" variant="default">
      {pending && <LucideLoaderCircle className="mr-2 w-4 h-4 animate-spin"/>}
      {label}
    </Button>
  )
}

export {SubmitButton}