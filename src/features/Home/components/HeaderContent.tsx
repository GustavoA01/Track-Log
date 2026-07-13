import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FolderDialog } from "@/features/FolderForm/container/FolderDialog";
import { cn } from "@/lib/utils";
import { AccountContent } from "./AccountContent";
import { AvatarButton } from "./AvatarButton";

type HeaderContentProps = {
  name: string | undefined | null;
};

export const HeaderContent = ({ name }: HeaderContentProps) => (
  <>
    <FolderDialog />
    <Link href="/musica/nova" className={cn(buttonVariants({ size: "sm" }))}>
      <Plus data-icon="inline-start" />
      Nova música
    </Link>

    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Abrir menu da conta"
            className="hidden rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
          />
        }
      >
        <AvatarButton name={name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48 p-2">
        <AccountContent name={name} />
      </DropdownMenuContent>
    </DropdownMenu>

    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Abrir menu da conta"
            className="inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
          />
        }
      >
        <AvatarButton name={name} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Conta</SheetTitle>
        </SheetHeader>
        <AccountContent name={name} />
      </SheetContent>
    </Sheet>
  </>
);
