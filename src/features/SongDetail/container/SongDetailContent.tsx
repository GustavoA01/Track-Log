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
  getYouTubeEmbedUrl,
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
  accentColor: string;
};

export function SongDetailContent({
  song: initialSong,
  folder,
  accentColor,
}: SongDetailContentProps) {
  const router = useRouter();
  const [song, setSong] = useState(initialSong);

  const sessions = getSessionsBySongId(song.id);
  const sessionCount = getSessionCountBySongId(song.id);
  const totalMinutes = getPracticeMinutesBySongId(song.id);

  function handleDelete() {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir "${song.title}"? Esta ação não pode ser desfeita.`,
    );

    if (confirmed) router.push("/");
  }

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
}
