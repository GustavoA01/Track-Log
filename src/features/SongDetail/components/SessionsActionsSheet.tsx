"use client";
import { useState } from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SessionsActionsSheetProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const SessionsActionsSheet = ({
  onEdit,
  onDelete,
}: SessionsActionsSheetProps) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setOpen(false);
    onDelete();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 shrink-0 sm:hidden"
            aria-label="Opções da sessão"
          />
        }
      >
        <Ellipsis className="size-4" />
      </SheetTrigger>
      <SheetContent showCloseButton>
        <SheetHeader>
          <SheetTitle>Ações</SheetTitle>
          <SheetDescription>Gerencie os dados dessa sessão</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button
            variant="outline"
            className="h-11 w-full justify-start gap-2"
            onClick={handleEdit}
          >
            <Pencil className="size-4" />
            Editar
          </Button>
          <Button
            variant="destructive"
            className="h-11 w-full justify-start gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="size-4" />
            Excluir
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
