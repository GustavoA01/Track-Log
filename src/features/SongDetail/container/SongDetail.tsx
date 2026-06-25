import { getFolderById } from "@/data/mock-data";
import type { SongType } from "@/data/types";
import { SongDetailContent } from "@/features/SongDetail/container/SongDetailContent";

type SongDetailProps = {
  song: SongType;
};

function resolveAccentColor(song: SongType) {
  if (song.accentColor) return song.accentColor;

  const folder = getFolderById(song.folderId);
  if (folder?.color) return folder.color;

  return "#7c3aed";
}

export function SongDetail({ song }: SongDetailProps) {
  const folder = getFolderById(song.folderId);
  const accentColor = resolveAccentColor(song);

  return (
    <SongDetailContent song={song} folder={folder} accentColor={accentColor} />
  );
}
