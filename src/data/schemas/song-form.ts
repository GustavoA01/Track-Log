import { z } from "zod";

import type { SongStatusType, SongType } from "@/data/types";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().url().safeParse(value).success,
    { message: "Informe uma URL válida" },
  );

export const songStatusValues: SongStatusType[] = [
  "learning",
  "want_to_learn",
  "learned",
  "paused",
];

export const songFormSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório"),
  artist: z.string().trim().min(1, "Artista é obrigatório"),
  status: z.enum(songStatusValues),
  imageUrl: optionalUrl,
  videoUrl: optionalUrl,
  tabUrl: optionalUrl,
  genre: z.string().trim(),
  instrument: z.string().trim(),
  notes: z.string().trim(),
});

export type SongFormValuesType = z.infer<typeof songFormSchema>;

export const songFormDefaultValues: SongFormValuesType = {
  title: "",
  artist: "",
  status: "want_to_learn",
  imageUrl: "",
  videoUrl: "",
  tabUrl: "",
  genre: "",
  instrument: "",
  notes: "",
};

export const songToFormValues = (song: SongType): SongFormValuesType => ({
  title: song.title,
  artist: song.artist,
  status: song.status,
  imageUrl: song.imageUrl ?? "",
  videoUrl: song.videoUrl ?? "",
  tabUrl: song.tabUrl ?? "",
  genre: song.genre,
  instrument: song.instrument,
  notes: song.notes,
});

export const formValuesToSongPayload = (values: SongFormValuesType) => ({
  title: values.title,
  artist: values.artist,
  status: values.status,
  imageUrl: values.imageUrl || undefined,
  videoUrl: values.videoUrl || undefined,
  tabUrl: values.tabUrl || undefined,
  genre: values.genre,
  instrument: values.instrument,
  notes: values.notes,
});
