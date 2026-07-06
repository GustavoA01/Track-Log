"use client";
import { updateSongResources } from "@/actions/songs/updateSongResources";
import type { FolderType, PracticeSessionType, SongType } from "@/data/types";
import { SongMetadata } from "@/features/SongDetail/components/SongMetadata";
import {
  SongResourceCard,
  tabResourceDefaults,
  videoResourceDefaults,
} from "@/features/SongDetail/components/SongResourceCard";
import { SongSessions } from "@/features/SongDetail/components/SongSessions";
import { ActiveSessionBar } from "@/features/StartSession/container/ActiveSessionBar";
import { EndSessionDialog } from "@/features/StartSession/container/EndSessionDialog";
import { usePracticeSessionTimer } from "@/features/StartSession/hooks/usePracticeSessionTimer";
import { useCreateSessionMutation } from "@/features/StartSession/hooks/useCreateSessionMutation";
import { DeleteSongDialog } from "./DeleteSongDialog";
import { SongHeader } from "../components/SongHeader";
import { HeroSection } from "./HeroSection";
import { useSongDetailContent } from "../hooks/useSongDetailContent";

type SongDetailContentProps = {
  song: SongType;
  sessions: PracticeSessionType[];
  folder?: Pick<FolderType, "name" | "color">;
  backHref: string;
};

export const SongDetailContent = ({
  song: initialSong,
  sessions,
  folder,
  backHref,
}: SongDetailContentProps) => {
  const {
    song,
    deleteDialogOpen,
    setDeleteDialogOpen,
    sessionCount,
    totalMinutes,
    getYouTubeEmbedUrl,
    setSong,
  } = useSongDetailContent({ initialSong, sessions });

  const { mutateAsync: createSession, isPending: isSavingSession } =
    useCreateSessionMutation(song.id);

  const {
    handleStartSession,
    handleRequestStop,
    handleEndSession,
    handleTogglePause,
    getElapsedMinutes,
    isTimerActive,
    isPaused,
    isEndSessionOpen,
    remainingTime,
    sessionProgress,
  } = usePracticeSessionTimer();

  const handleSaveSessionNotes = async (notes: string) => {
    await createSession({ minutes: getElapsedMinutes(), notes });
    handleEndSession();
  };

  return (
    <div className="min-h-full bg-background">
      <SongHeader
        songId={song.id}
        backHref={backHref}
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <DeleteSongDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        songId={song.id}
        songTitle={song.title}
      />

      <main className="pb-20">
        <HeroSection
          song={song}
          folder={folder ?? undefined}
          sessionCount={sessionCount}
          totalMinutes={totalMinutes}
          onStartSession={handleStartSession}
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
                onSave={async (videoUrl) => {
                  const updated = await updateSongResources(song.id, {
                    videoUrl,
                  });
                  setSong(updated);
                }}
                onRemove={async () => {
                  const updated = await updateSongResources(song.id, {
                    videoUrl: null,
                  });
                  setSong(updated);
                }}
              />

              <SongResourceCard
                {...tabResourceDefaults}
                url={song.tabUrl}
                onSave={async (tabUrl) => {
                  const updated = await updateSongResources(song.id, {
                    tabUrl,
                  });
                  setSong(updated);
                }}
                onRemove={async () => {
                  const updated = await updateSongResources(song.id, {
                    tabUrl: null,
                  });
                  setSong(updated);
                }}
              />
            </div>
          </section>

          <SongMetadata song={song} />
          <SongSessions songId={song.id} sessions={sessions} />
        </div>
      </main>

      {isTimerActive && !isEndSessionOpen && (
        <ActiveSessionBar
          title={song.title}
          remainingTime={remainingTime}
          progress={sessionProgress}
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          onStop={handleRequestStop}
        />
      )}

      <EndSessionDialog
        open={isEndSessionOpen}
        songTitle={song.title}
        songArtist={song.artist}
        minutes={getElapsedMinutes()}
        isSubmitting={isSavingSession}
        onSave={handleSaveSessionNotes}
        onDiscard={handleEndSession}
      />
    </div>
  );
};
