import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { forgotPassword, signUpPath } from "@/paths";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact 
        title="Sign In"
        description="Sign In to your account"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <div className="flex-1 flex justify-between">
            <Link href={signUpPath()} className="text-sm text-muted-foreground cursor-pointer hover:underline">
              No account yet?
            </Link>
            <Link href={forgotPassword()} className="text-sm text-muted-foreground cursor-pointer hover:underline">
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  )
};

export default SignIn;