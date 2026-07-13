import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "@/features/Home/container/LogoutButton";
import { cn } from "@/lib/utils";

type AccountContentProps = {
  name: string | undefined | null;
};

export const AccountContent = ({ name }: AccountContentProps) => (
  <>
    <p>{name}</p>
    <Separator className="my-2" />
    <Link
      href="/cadastrar?edit=true"
      className={cn(
        "max-sm:rounded-full w-full",
        buttonVariants({ size: "sm", variant: "ghost" }),
      )}
    >
      Alterar dados
    </Link>
    <LogoutButton />
  </>
);
