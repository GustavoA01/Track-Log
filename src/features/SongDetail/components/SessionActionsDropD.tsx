import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SessionActionsDropDownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const SessionActionsDropDown = ({
  onEdit,
  onDelete,
}: SessionActionsDropDownProps) => {
  const itens = [
    {
      label: "Editar",
      icon: Pencil,
      onClick: onEdit,
      variant: "ghost" as const,
    },
    {
      label: "Excluir",
      icon: Trash2,
      onClick: onDelete,
      variant: "destructive" as const,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden size-7 shrink-0 sm:inline-flex"
            aria-label="Opções da sessão"
          />
        }
      >
        <Ellipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-max">
        {itens.map((item) => (
          <DropdownMenuItem
            key={item.label}
            nativeButton
            className="cursor-pointer w-full"
            onClick={item.onClick}
            render={
              <Button variant={item.variant}>
                <item.icon className="size-3.5" />
                {item.label}
              </Button>
            }
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
