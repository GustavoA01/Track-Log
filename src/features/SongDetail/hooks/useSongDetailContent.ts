import { useState } from "react";
import type { PracticeSessionType, SongType } from "@/data/types";
import { updateSongResources } from "@/actions/songs/updateSongResources";
import { UpdateSongResourcesInput } from "@/data/types/actions";

type UseSongDetailContentProps = {
  initialSong: SongType;
  sessions: PracticeSessionType[];
};

export const useSongDetailContent = ({
  initialSong,
  sessions,
}: UseSongDetailContentProps) => {
  const [song, setSong] = useState(initialSong);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const sessionCount = sessions.length;
  const totalMinutes = sessions.reduce(
    (acc, session) => acc + session.minutes,
    0,
  );

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

  const onChangeMedia = async (mediaUrl: UpdateSongResourcesInput) => {
    const updated = await updateSongResources(song.id, mediaUrl);
    setSong(updated);
  };

  return {
    song,
    deleteDialogOpen,
    setDeleteDialogOpen,
    sessionCount,
    totalMinutes,
    getYouTubeEmbedUrl,
    setSong,
    onChangeMedia,
  };
};
