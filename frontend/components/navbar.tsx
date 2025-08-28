import { cn } from "../utils/cn";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import logo from "../public/assets/starknotes-logo-large.png";

function NavBar() {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 p-2 sm:p-5 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex gap-1 items-center">
          <Link href={"/"} className="text-lg font-bold">
            <Image
              src={logo}
              alt="starknotes logo"
              className="aspect-square w-6"
            />
          </Link>
          <Link href={"/"} className="text-lg font-bold hidden sm:inline-block">
            StarkNotes
          </Link>
        </div>
        <ul className="inline-flex items-center space-x-4">
          <li>
            <Link
              href={"/sign-up"}
              className="text-black/70 dark:text-white/70 dark:hover:text-white hover:text-black"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              href={"/sign-in"}
              className="text-black/70 dark:text-white/70 dark:hover:text-white hover:text-black"
            >
              Sign In
            </Link>
          </li>
        </ul>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default NavBar;
