import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateFolder } from "@/actions/folders/updateFolder";
import type { FolderFormValuesType } from "@/data/schemas/folder-form";
import { folderKeys } from "@/services/query/folder-keys";

type UpdateFolderInput = {
  id: string;
  values: FolderFormValuesType;
};

export const useUpdateFolderMutation = () => {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

  const { mutateAsync: updateFolderFn, isPending } = useMutation({
    mutationFn: ({ id, values }: UpdateFolderInput) => updateFolder(id, values),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
      queryClient.invalidateQueries({ queryKey: folderKeys.detail(id) });
      refresh();
      toast.success("Pasta atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a pasta. Tente novamente.",
      );
    },
  });

  return {
    updateFolderFn,
    isPending,
  };
};
