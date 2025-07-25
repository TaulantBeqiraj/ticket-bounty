import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { signInPath } from "@/paths";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

const SignUpPage = () => {
  return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <CardCompact 
          title="Sign Up"
          description="Create an account to get started"
          className="w-full max-w-[420px] animate-fade-from-top"
          content={<SignUpForm />}
          footer={
            <Link href={signInPath()} className="text-sm text-muted-foreground cursor-pointer">
              Have an account, Sign in now.
            </Link>
          }
        />
      </div>
  )
};

export default SignUpPage;