"use client";
import { tabResourceDefaults, videoResourceDefaults } from "@/data/constants";
import type { FolderType, PracticeSessionType, SongType } from "@/data/types";
import { SongMetadata } from "@/features/SongDetail/components/SongMetadata";
import { SongResourceCard } from "@/features/SongDetail/container/SongResourceCard";
import { SongSessions } from "@/features/SongDetail/components/SongSessions";
import { ActiveSessionBar } from "@/features/StartSession/components/ActiveSessionBar";
import { EndSessionDialog } from "@/features/StartSession/container/EndSessionDialog";
import { usePracticeSessionTimer } from "@/features/StartSession/hooks/usePracticeSessionTimer";
import { useCreateSessionMutation } from "@/features/StartSession/hooks/useCreateSessionMutation";
import { DeleteSongDialog } from "./DeleteSongDialog";
import { SongHeader } from "../components/SongHeader";
import { HeroSection } from "./HeroSection";
import { SongFoldersSection } from "./SongFoldersSection";
import { useSongDetailContent } from "../hooks/useSongDetailContent";

type SongDetailContentProps = {
  song: SongType;
  sessions: PracticeSessionType[];
  folders: FolderType[];
  backHref: string;
};

export const SongDetailContent = ({
  song: initialSong,
  sessions,
  folders,
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
    onChangeMedia,
  } = useSongDetailContent({ initialSong, sessions });

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

  const { mutateAsync: createSession, isPending: isSavingSession } =
    useCreateSessionMutation(song.id);

  const handleSaveSessionNotes = async (notes: string) => {
    await createSession({ minutes: getElapsedMinutes(), notes });
    handleEndSession();
  };

  const transformedFolders = folders
    .filter((folder) => song.folderIds.includes(folder.id))
    .map(({ id, name, color }) => ({ id, name, color }));

  return (
    <div className="min-h-full bg-background">
      <SongHeader
        songId={song.id}
        backHref={backHref}
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <main className="pb-20">
        <HeroSection
          song={song}
          folders={transformedFolders}
          sessionCount={sessionCount}
          totalMinutes={totalMinutes}
          onStartSession={handleStartSession}
          onStatusChange={(status) =>
            setSong((currentSong) => ({ ...currentSong, status }))
          }
        />

        <div className="container mx-auto space-y-8 px-4 pt-8 sm:px-6">
          <SongFoldersSection
            songId={song.id}
            folders={folders}
            songFolderIds={song.folderIds}
            onFolderIdsChange={(folderIds) =>
              setSong((currentSong) => ({ ...currentSong, folderIds }))
            }
          />

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

            <div className="space-y-4">
              <SongResourceCard
                {...videoResourceDefaults}
                url={song.videoUrl}
                embedUrl={
                  song.videoUrl ? getYouTubeEmbedUrl(song.videoUrl) : null
                }
                onSave={(videoUrl) => onChangeMedia({ videoUrl })}
                onRemove={() => onChangeMedia({ videoUrl: null })}
              />

              <SongResourceCard
                {...tabResourceDefaults}
                url={song.tabUrl}
                onSave={(tabUrl) => onChangeMedia({ tabUrl })}
                onRemove={() => onChangeMedia({ tabUrl: null })}
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

      <DeleteSongDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        songId={song.id}
        songTitle={song.title}
      />
    </div>
  );
};
