import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteFolder } from "@/actions/folders/deleteFolder";
import { folderKeys } from "@/lib/query/folder-keys";

export const useDeleteFolderMutation = () => {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
      queryClient.removeQueries({ queryKey: folderKeys.detail(id) });
      refresh();
      toast.success("Pasta excluída com sucesso!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a pasta. Tente novamente.",
      );
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
