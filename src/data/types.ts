export type SongStatusType =
  | "learning"
  | "want_to_learn"
  | "learned"
  | "paused";

export type FolderKindType = "custom" | "genre" | "instrument";

export interface FolderType {
  id: string;
  name: string;
  color: string;
  type: FolderKindType;
  imageUrl?: string;
}

export interface SongType {
  id: string;
  folderId: string;
  title: string;
  artist: string;
  genre: string;
  instrument: string;
  difficulty: number;
  status: SongStatusType;
  progress: number;
  createdAt: string;
  notes: string;
  imageUrl?: string;
  videoUrl?: string;
  tabUrl?: string;
  accentColor?: string;
  sessionsTotalTime: number;
}

export interface PracticeSessionType {
  id: string;
  songId: string;
  date: string;
  minutes: number;
  notes: string;
}
