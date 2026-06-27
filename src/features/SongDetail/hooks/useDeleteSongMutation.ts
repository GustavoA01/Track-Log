import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSong } from "@/actions/songs/deleteSong";
import { songKeys } from "@/lib/query/song-keys";

export const useDeleteSongMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => deleteSong(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.removeQueries({ queryKey: songKeys.detail(id) });
      toast.success("Música excluída com sucesso!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a música. Tente novamente.",
      );
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
