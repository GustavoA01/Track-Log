"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Timer, Trash2 } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { SongStatusBadge } from "@/components/SongStatusBadge";
import {
  getPracticeMinutesBySongId,
  getSessionCountBySongId,
  getSessionsBySongId,
} from "@/data/mock-data";
import type { FolderType, SongType } from "@/data/types";
import { SongCover } from "@/features/SongDetail/components/SongCover";
import { SongMetadata } from "@/features/SongDetail/components/SongMetadata";
import {
  getYouTubeEmbedUrl,
  SongResourceCard,
  tabResourceDefaults,
  videoResourceDefaults,
} from "@/features/SongDetail/components/SongResourceCard";
import { SongSessions } from "@/features/SongDetail/components/SongSessions";
import { cn } from "@/lib/utils";

type SongDetailContentProps = {
  song: SongType;
  folder?: FolderType;
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

    if (confirmed) {
      router.push("/");
    }
  }

  return (
    <div className="min-h-full bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <ArrowLeft data-icon="inline-start" />
            Voltar
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href={`/musica/${song.id}/editar`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <Pencil data-icon="inline-start" />
              Editar
            </Link>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 data-icon="inline-start" />
              Excluir
            </Button>
          </div>
        </div>
      </header>

      <main className="pb-12">
        <section
          className="w-full"
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, ${accentColor} 40%, var(--background)) 0%, var(--background) 100%)`,
          }}
        >
          <div className="container mx-auto px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:gap-12">
              <div className="w-full max-w-[280px] shrink-0 lg:max-w-[360px]">
                <SongCover
                  title={song.title}
                  imageUrl={song.imageUrl}
                  accentColor={accentColor}
                  fallbackColor={folder?.color}
                />
              </div>

              <div className="flex w-full flex-1 flex-col items-center gap-4 text-center lg:items-start lg:pb-2 lg:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <SongStatusBadge status={song.status} />
                  {folder && <Badge variant="outline">{folder.name}</Badge>}
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                    {song.title}
                  </h1>
                  <p className="text-lg text-muted-foreground lg:text-xl">
                    {song.artist}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {sessionCount} {sessionCount === 1 ? "sessão" : "sessões"} ·{" "}
                  {totalMinutes} min praticados
                </p>

                <Button size="lg" className="w-full sm:w-auto">
                  <Timer data-icon="inline-start" />
                  Iniciar sessão de estudo
                </Button>
              </div>
            </div>
          </div>
        </section>

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
                Links opcionais para vídeo e tablatura durante a prática.
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
