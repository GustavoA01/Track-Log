import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FolderDialogHeaderProps = {
  isEditing?: boolean;
};

export const FolderDialogHeader = ({
  isEditing = false,
}: FolderDialogHeaderProps) => (
  <DialogHeader>
    <DialogTitle>{isEditing ? "Editar pasta" : "Nova pasta"}</DialogTitle>
    <DialogDescription>
      {isEditing
        ? "Atualize o nome ou a imagem da pasta."
        : "Organize suas músicas em uma pasta personalizada."}
    </DialogDescription>
  </DialogHeader>
);
