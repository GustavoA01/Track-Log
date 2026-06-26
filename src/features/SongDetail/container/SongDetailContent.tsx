"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getPracticeMinutesBySongId,
  getSessionCountBySongId,
  getSessionsBySongId,
} from "@/data/mock-data";
import type { FolderType, SongType } from "@/data/types";
import { SongMetadata } from "@/features/SongDetail/components/SongMetadata";
import {
  SongResourceCard,
  tabResourceDefaults,
  videoResourceDefaults,
} from "@/features/SongDetail/components/SongResourceCard";
import { SongSessions } from "@/features/SongDetail/components/SongSessions";
import { SongHeader } from "../components/SongHeader";
import { HeroSection } from "../components/HeroSection";

type SongDetailContentProps = {
  song: SongType;
  folder?: Pick<FolderType, "name" | "color">;
};

const getAccentColor = (song: SongType, folder?: Pick<FolderType, "color">) => {
  if (song.accentColor) return song.accentColor;
  if (folder?.color) return folder.color;
  return "#7c3aed";
};

export const SongDetailContent = ({
  song: initialSong,
  folder,
}: SongDetailContentProps) => {
  const router = useRouter();
  const [song, setSong] = useState(initialSong);
  const accentColor = getAccentColor(song, folder ?? undefined);
  const sessions = getSessionsBySongId(song.id);
  const sessionCount = getSessionCountBySongId(song.id);
  const totalMinutes = getPracticeMinutesBySongId(song.id);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir "${song.title}"? Esta ação não pode ser desfeita.`,
    );

    if (confirmed) router.push("/");
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

  return (
    <div className="min-h-full bg-background">
      <SongHeader songId={song.id} handleDelete={handleDelete} />

      <main className="pb-12">
        <HeroSection
          song={song}
          accentColor={accentColor}
          folder={folder ?? undefined}
          sessionCount={sessionCount}
          totalMinutes={totalMinutes}
        />

        <div className="container mx-auto space-y-8 px-4 pt-8 sm:px-6">
          {song.notes && (
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                Anotações
              </p>
              <p className="text-sm">{song.notes}</p>
            </div>
          )}

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-medium">Recursos de estudo</h2>
              <p className="text-sm text-muted-foreground">
                Links para vídeo e tablatura durante a prática
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <SongResourceCard
                {...videoResourceDefaults}
                url={song.videoUrl}
                embedUrl={
                  song.videoUrl ? getYouTubeEmbedUrl(song.videoUrl) : null
                }
                onSave={(videoUrl) =>
                  setSong((current) => ({ ...current, videoUrl }))
                }
                onRemove={() =>
                  setSong((current) => ({ ...current, videoUrl: undefined }))
                }
              />

              <SongResourceCard
                {...tabResourceDefaults}
                url={song.tabUrl}
                onSave={(tabUrl) =>
                  setSong((current) => ({ ...current, tabUrl }))
                }
                onRemove={() =>
                  setSong((current) => ({ ...current, tabUrl: undefined }))
                }
              />
            </div>
          </section>

          <SongMetadata song={song} />
          <SongSessions initialSessions={sessions} />
        </div>
      </main>
    </div>
  );
};
