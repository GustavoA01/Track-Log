import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  songFormDefaultValues,
  songFormSchema,
  type SongFormValuesType,
} from "@/data/schemas/song-form";

import { useCreateSongMutation } from "./useCreateSongMutation";

export const useSongForm = () => {
  const { createSongFn, isPending, goBack } = useCreateSongMutation();

  const methods = useForm<SongFormValuesType>({
    resolver: zodResolver(songFormSchema),
    defaultValues: songFormDefaultValues,
  });

  const { control } = methods;
  const imageUrl = useWatch({ control, name: "imageUrl" });

  const onSubmit = async (data: SongFormValuesType) => {
    await createSongFn(data);
  };

  const handleCancel = () => goBack();

  return {
    methods,
    register: methods.register,
    handleSubmit: methods.handleSubmit(onSubmit),
    handleCancel,
    imageUrl,
    isSaving: isPending,
  };
};
