import { SignInForm } from "@/components/signin-form";
import frame from "../../public/assets/frame-medium.jpg";
import Image from "next/image";

function SignIn() {
  return (
    <div className="grid items-center md:items-stretch p-0 md:grid-cols-2 min-h-svh">
      <div className="flex items-center">
        <SignInForm />
      </div>
      <div className="hidden md:block bg-black/3">
        <Image
          src={frame}
          alt="Image"
          className="h-full object-cover saturate-0"
        />
      </div>
    </div>
  );
}

export default SignIn;
