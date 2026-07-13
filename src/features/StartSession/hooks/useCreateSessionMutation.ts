import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSession } from "@/actions/sessions/createSession";
import type { CreateSessionInput } from "@/data/schemas/create-session";
import { sessionKeys } from "@/services/query/session-keys";

export const useCreateSessionMutation = (songId: string) => {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Omit<CreateSessionInput, "songId">) =>
      createSession({ ...data, songId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      queryClient.invalidateQueries({ queryKey: sessionKeys.bySong(songId) });
      refresh();
      toast.success("Sessão registrada!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a sessão. Tente novamente.",
      );
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
