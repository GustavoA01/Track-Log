import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateSong } from "@/actions/songs/updateSong";
import type { SongFormValuesType } from "@/data/schemas/song-form";
import { songKeys } from "@/lib/query/song-keys";

type UpdateSongVariables = {
  songId: string;
  data: SongFormValuesType;
};

export const useUpdateSongMutation = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutateAsync: updateSongFn, isPending } = useMutation({
    mutationFn: ({ songId, data }: UpdateSongVariables) =>
      updateSong(songId, data),
    onSuccess: (data, { songId }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.invalidateQueries({ queryKey: songKeys.detail(songId) });
      toast.success("Música atualizada com sucesso!");
      setTimeout(() => {
        push(`/musica/${data.id}`);
      }, 800);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a música. Tente novamente.",
      );
    },
  });

  return {
    updateSongFn,
    isPending,
  };
};
