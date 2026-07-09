import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import type { SongType } from "@/data/types";
import {
  songFormDefaultValues,
  songFormSchema,
  type SongFormValuesType,
} from "@/data/schemas/song-form";
import { useCreateSongMutation } from "./useCreateSongMutation";
import { useUpdateSongMutation } from "./useUpdateSongMutation";

export const useSongForm = (
  song?: SongType | null,
  initialFolderIds?: string[],
) => {
  const { back } = useRouter();
  const isEditing = Boolean(song?.id);
  const { createSongFn, isPending: isCreating } = useCreateSongMutation();
  const { updateSongFn, isPending: isUpdating } = useUpdateSongMutation();

  const methods = useForm<SongFormValuesType>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      ...songFormDefaultValues,
      folderIds: initialFolderIds ?? song?.folderIds ?? [],
    },
  });

  const { control } = methods;
  const imageUrl = useWatch({ control, name: "imageUrl" });

  const onSubmit = async (data: SongFormValuesType) => {
    if (isEditing && song?.id) {
      await updateSongFn({ songId: song.id, data });
      return;
    }

    await createSongFn(data);
  };

  return {
    methods,
    reset: methods.reset,
    register: methods.register,
    handleSubmit: methods.handleSubmit(onSubmit),
    handleCancel: back,
    imageUrl,
    isSaving: isCreating || isUpdating,
    isEditing,
  };
};
