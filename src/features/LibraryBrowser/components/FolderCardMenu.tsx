import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FolderCardMenuProps = {
  onDelete: () => void;
  onEdit: () => void;
};

export const FolderCardMenu = ({ onDelete, onEdit }: FolderCardMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-7 shrink-0"
          aria-label="Opções da pasta"
          onClick={(event) => event.stopPropagation()}
        />
      }
    >
      <EllipsisVertical className="size-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-auto min-w-max">
      <DropdownMenuItem className="gap-2" onClick={onEdit}>
        <Pencil className="size-3.5" />
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem
        variant="destructive"
        className="gap-2"
        onClick={onDelete}
      >
        <Trash2 className="size-3.5" />
        Excluir
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
