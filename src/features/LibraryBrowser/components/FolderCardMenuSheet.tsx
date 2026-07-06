import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type FolderCardMenuSheetProps = {
  folderName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const FolderCardMenuSheet = ({
  folderName,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: FolderCardMenuSheetProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent showCloseButton>
      <SheetHeader>
        <SheetTitle>{folderName}</SheetTitle>
        <SheetDescription>Ações da pasta</SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <Button
          variant="outline"
          className="h-11 w-full justify-start gap-2"
          onClick={onEdit}
        >
          <Pencil className="size-4" />
          Editar pasta
        </Button>
        <Button
          variant="destructive"
          className="h-11 w-full justify-start gap-2"
          onClick={onDelete}
        >
          <Trash2 className="size-4" />
          Excluir pasta
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);
