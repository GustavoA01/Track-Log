import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

export const SessionActions = () => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={<Button variant="ghost" aria-label="Opções da sessão" />}
    >
      <Ellipsis />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem className="w-auto min-w-max">
        <Button variant="ghost" size="sm" className="w-full">
          <Pencil className="size-3.5 text-muted-foreground" />
          <span className="text-muted-foreground text-xs">Editar</span>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-auto min-w-max">
        <Button variant="ghost" size="sm" className="w-full">
          <Trash2 className="text-destructive" />
          <span className="text-destructive text-xs">Excluir</span>
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
