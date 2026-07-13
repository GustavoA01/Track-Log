import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSong } from "@/actions/songs/deleteSong";
import { songKeys } from "@/services/query/song-keys";
import { useRouter } from "next/navigation";

export const useDeleteSongMutation = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => deleteSong(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.removeQueries({ queryKey: songKeys.detail(id) });
      toast.success("Música excluída com sucesso!");
      replace("/");
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
