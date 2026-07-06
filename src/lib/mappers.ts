import type {
  FolderRecord,
  PracticeSessionRecord,
  SongRecord,
} from "@/lib/prisma-types";
import type {
  FolderType,
  PracticeSessionType,
  SongStatusType,
  SongType,
} from "@/data/types";
import { toDateOnlyString } from "@/lib/dates";

export const toFolderType = (folder: FolderRecord): FolderType => ({
  id: folder.id,
  name: folder.name,
  color: folder.color,
  imageUrl: folder.imageUrl ?? undefined,
});

export const toSongType = (
  song: SongRecord,
  sessionsTotalTime = 0,
): SongType => ({
  id: song.id,
  folderId: song.folderId ?? undefined,
  title: song.title,
  artist: song.artist,
  genre: song.genre,
  instrument: song.instrument,
  difficulty: song.difficulty,
  status: song.status as SongStatusType,
  createdAt: toDateOnlyString(song.createdAt),
  notes: song.notes,
  imageUrl: song.imageUrl ?? undefined,
  videoUrl: song.videoUrl ?? undefined,
  tabUrl: song.tabUrl ?? undefined,
  accentColor: song.accentColor ?? undefined,
  sessionsTotalTime,
});

export const toPracticeSessionType = (
  session: PracticeSessionRecord,
): PracticeSessionType => ({
  id: session.id,
  songId: session.songId,
  date: toDateOnlyString(session.date),
  minutes: session.minutes,
  notes: session.notes,
});
