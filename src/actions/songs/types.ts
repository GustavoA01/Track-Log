import type { FolderFormValuesType } from "@/data/schemas/folder-form";
import type { SongFormValuesType } from "@/data/schemas/song-form";

export type CreateSongInput = SongFormValuesType;
export type UpdateSongInput = Partial<SongFormValuesType>;
export type UpdateFolderInput = FolderFormValuesType;
export type UpdateSongResourcesInput = {
  videoUrl?: string | null;
  tabUrl?: string | null;
};
