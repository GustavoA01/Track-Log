import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSessionsBySongId } from "@/actions/sessions/deleteSessionsBySongId";
import { sessionKeys } from "@/lib/query/session-keys";

export const useClearSessionsMutation = (songId: string) => {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteSessionsBySongId(songId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      queryClient.invalidateQueries({ queryKey: sessionKeys.bySong(songId) });
      refresh();
      toast.success("Sessões excluídas!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível limpar as sessões. Tente novamente.",
      );
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
