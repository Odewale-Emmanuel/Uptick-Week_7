"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { JSX } from "react";

function UnauthenticatedUser(): JSX.Element {
  const router = useRouter();
  setTimeout(() => {
    router.push("/sign-in");
  }, 3000);

  return (
    <div className="flex items-center justify-center w-full h-full text-gray-800">
      <span className="inline-flex flex-col items-center gap-1">
        <LoaderIcon
          size={30}
          className="animate-spin text-black dark:text-white"
        />
        <span className="text-gray-700 dark:text-gray-500 text-sm">
          <span className="font-bold">Unathenticated user</span> Redirecting to{" "}
          <span className="font-bold">"/sign-in"</span> page now!
        </span>
      </span>
    </div>
  );
}

export { UnauthenticatedUser };
