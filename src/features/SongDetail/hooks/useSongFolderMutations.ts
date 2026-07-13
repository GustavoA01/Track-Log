import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addSongToFolder } from "@/actions/songs/addSongToFolder";
import { removeSongFromFolder } from "@/actions/songs/removeSongFromFolder";
import { songKeys } from "@/services/query/song-keys";

export const useAddSongToFolderMutation = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: string) => addSongToFolder(songId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.invalidateQueries({ queryKey: songKeys.detail(songId) });
      toast.success("Música adicionada à pasta");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível adicionar à pasta.",
      );
    },
  });
};

export const useRemoveSongFromFolderMutation = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: string) => removeSongFromFolder(songId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.invalidateQueries({ queryKey: songKeys.detail(songId) });
      toast.success("Música removida da pasta");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível remover da pasta.",
      );
    },
  });
};
