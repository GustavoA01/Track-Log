import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SessionActionsProps = {
  onDelete: () => void;
};

export const SessionActions = ({ onDelete }: SessionActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button variant="ghost" size="icon-sm" aria-label="Opções da sessão" />
      }
    >
      <Ellipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-auto min-w-max">
      <DropdownMenuItem className="gap-2">
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
