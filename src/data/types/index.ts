export type SongStatusType =
  | "learning"
  | "want_to_learn"
  | "learned"
  | "paused";

export interface FolderType {
  id: string;
  name: string;
  color: string;
  imageUrl?: string;
}

export interface SongType {
  id: string;
  folderIds: string[];
  title: string;
  artist: string;
  genre: string;
  instrument: string;
  difficulty: number;
  status: SongStatusType;
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

export type SongStatusConfig = {
  label: string;
  badgeClassName: string;
  selectTriggerClassName: string;
};
