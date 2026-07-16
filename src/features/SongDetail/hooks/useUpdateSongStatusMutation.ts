import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSongStatus } from "@/actions/songs/updateSongStatus";
import type { SongStatusType, SongType } from "@/data/types";
import { songKeys } from "@/services/query/song-keys";

type UpdateSongStatusVariables = {
  songId: string;
  status: SongStatusType;
};

type UseUpdateSongStatusMutationProps = {
  songId: string;
  status: SongStatusType;
  onStatusChange: (status: SongStatusType) => void;
};

export const useUpdateSongStatusMutation = ({
  songId,
  status,
  onStatusChange,
}: UseUpdateSongStatusMutationProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateStatusFn, isPending } = useMutation({
    mutationFn: ({ songId, status }: UpdateSongStatusVariables) =>
      updateSongStatus(songId, status),
    onSuccess: (song: SongType) => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.invalidateQueries({ queryKey: songKeys.detail(song.id) });
      toast.success("Status atualizado!");
      setShowSuccess(true);
      onStatusChange("learned");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o status. Tente novamente.",
      );
    },
  });

  const handleMarkAsLearned = async () => {
    if (isPending || showSuccess) return;
    try {
      await updateStatusFn({ songId, status: "learned" });
    } catch {}
  };

  return {
    isPending,
    handleMarkAsLearned,
    showSuccess,
    shouldRender: status !== "learned" || showSuccess,
  };
};
