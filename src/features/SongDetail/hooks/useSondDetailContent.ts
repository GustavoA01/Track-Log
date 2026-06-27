import { useState } from "react";
import type { FolderType, SongType } from "@/data/types";
import {
  getPracticeMinutesBySongId,
  getSessionCountBySongId,
  getSessionsBySongId,
} from "@/data/mock-data";

type UseSongDetailContentProps = {
  initialSong: SongType;
  folder?: Pick<FolderType, "color">;
};

const getAccentColor = (song: SongType, folder?: Pick<FolderType, "color">) => {
  if (song.accentColor) return song.accentColor;
  if (folder?.color) return folder.color;
  return "#7c3aed";
};

export const useSongDetailContent = ({
  initialSong,
  folder,
}: UseSongDetailContentProps) => {
  const [song, setSong] = useState(initialSong);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const accentColor = getAccentColor(song, folder ?? undefined);
  const sessions = getSessionsBySongId(song.id);
  const sessionCount = getSessionCountBySongId(song.id);
  const totalMinutes = getPracticeMinutesBySongId(song.id);

  const handleStartSession = (minutes: number) => {
    console.log({ songId: song.id, durationMinutes: minutes });
  };

  const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        const videoId = parsed.pathname.slice(1);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.hostname.includes("youtube.com")) {
        const videoId = parsed.searchParams.get("v");
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;

        const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
        if (embedMatch?.[1])
          return `https://www.youtube.com/embed/${embedMatch[1]}`;
      }
    } catch {
      return null;
    }

    return null;
  };

  return {
    song,
    deleteDialogOpen,
    setDeleteDialogOpen,
    accentColor,
    sessions,
    sessionCount,
    totalMinutes,
    getYouTubeEmbedUrl,
    handleStartSession,
    setSong,
  };
};
