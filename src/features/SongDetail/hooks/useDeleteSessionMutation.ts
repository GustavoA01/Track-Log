import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSession } from "@/actions/sessions/deleteSession";
import { sessionKeys } from "@/lib/query/session-keys";

export const useDeleteSessionMutation = (songId: string) => {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (sessionId: string) => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      queryClient.invalidateQueries({ queryKey: sessionKeys.bySong(songId) });
      refresh();
      toast.success("Sessão excluída!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a sessão. Tente novamente.",
      );
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
