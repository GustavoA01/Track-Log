import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateSession } from "@/actions/sessions/updateSession";
import type { UpdateSessionInput } from "@/data/schemas/edit-session";
import { sessionKeys } from "@/lib/query/session-keys";

type UpdateSessionVariables = {
  sessionId: string;
  data: UpdateSessionInput;
};

type UseUpdateSessionMutationOptions = {
  onSuccess?: () => void;
};

export const useUpdateSessionMutation = (
  songId: string,
  options?: UseUpdateSessionMutationOptions,
) => {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ sessionId, data }: UpdateSessionVariables) =>
      updateSession(sessionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      queryClient.invalidateQueries({ queryKey: sessionKeys.bySong(songId) });
      refresh();
      toast.success("Sessão atualizada!");
      options?.onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a sessão. Tente novamente.",
      );
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
