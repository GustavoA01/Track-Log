export type SongStatus = "learning" | "want_to_learn" | "learned" | "paused";

export type FolderType = "custom" | "genre" | "instrument";

export interface Folder {
  id: string;
  name: string;
  color: string;
  type: FolderType;
  imageUrl?: string;
}

export interface Song {
  id: string;
  folderId: string;
  title: string;
  artist: string;
  genre: string;
  instrument: string;
  difficulty: number;
  originalBpm: number;
  currentBpm: number;
  status: SongStatus;
  progress: number;
  notes: string;
  imageUrl?: string;
}

export interface PracticeSession {
  id: string;
  songId: string;
  date: string;
  minutes: number;
  bpm: number;
  notes: string;
}
