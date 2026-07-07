import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createFolder } from "@/actions/folders/createFolder";
import type { FolderFormValuesType } from "@/data/schemas/folder-form";
import { folderKeys } from "@/lib/query/folder-keys";

export const useCreateFolderMutation = () => {
  const { refresh } = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutateAsync: createFolderFn, isPending } = useMutation({
    mutationFn: (data: FolderFormValuesType) => createFolder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
      refresh();
      toast.success("Pasta criada com sucesso!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível criar a pasta. Tente novamente.",
      );
    },
  });

  return {
    createFolderFn,
    isPending,
    open,
    setOpen,
  };
};
