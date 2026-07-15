import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "@/features/Home/container/LogoutButton";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

type AccountContentProps = {
  name: string | undefined | null;
};

export const AccountContent = ({ name }: AccountContentProps) => (
  <>
    <div className="flex justify-between">
      <p className="text-lg font-montserrat">{name}</p>
      <ThemeToggle />
    </div>
    <Separator className="my-2" />
    <Link
      href="/cadastrar?edit=true"
      className={cn(
        "max-sm:rounded-full w-full",
        buttonVariants({ size: "lg" }),
      )}
    >
      Alterar dados
    </Link>
    <LogoutButton />
  </>
);
