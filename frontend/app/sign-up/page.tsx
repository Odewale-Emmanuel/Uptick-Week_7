import { SignUpForm } from "@/components/signup-form";
import note from "../../public/assets/notes.jpg";
import Image from "next/image";

function SignUp() {
  return (
    <div className="grid items-center md:items-stretch p-0 md:grid-cols-2 min-h-svh">
      <div className="flex items-center">
        <SignUpForm />
      </div>

      <div className="hidden md:block bg-black/3">
        <Image
          src={note}
          alt="Image"
          className="h-full object-cover saturate-0"
        />
      </div>
    </div>
  );
}

export default SignUp;
