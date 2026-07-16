import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSong } from "@/actions/songs/createSong";
import type { CreateSongInput } from "@/data/types/actions";
import { songKeys } from "@/services/query/song-keys";
import { useRouter } from "next/navigation";

export const useCreateSongMutation = () => {
  const queryClient = useQueryClient();
  const { back, push } = useRouter();

  const { mutateAsync: createSongFn, isPending } = useMutation({
    mutationFn: (data: CreateSongInput) => createSong(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      toast.success("Música criada com sucesso!");
      setTimeout(() => {
        push(`/musica/${data.id}`);
      }, 800);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a música. Tente novamente.",
      );
    },
  });

  return {
    createSongFn,
    isPending,
    goBack: back,
  };
};
