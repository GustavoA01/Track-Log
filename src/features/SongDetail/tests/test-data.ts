import type { PracticeSessionType, SongType } from "@/data/types";

export const song: SongType = {
  id: "song-1",
  folderId: "folder-1",
  title: "Wonderwall",
  artist: "Oasis",
  genre: "Rock",
  instrument: "Violão",
  difficulty: 3,
  status: "learning",
  createdAt: "2026-01-15",
  notes: "Focar no refrão",
  imageUrl: "https://example.com/wonderwall.jpg",
  videoUrl: "https://www.youtube.com/watch?v=6hzrDe2EK-g",
  tabUrl: "https://example.com/tab",
  accentColor: "#7c3aed",
  sessionsTotalTime: 90,
};

export const sessions: PracticeSessionType[] = [
  {
    id: "session-1",
    songId: "song-1",
    date: "2026-02-01",
    minutes: 30,
    notes: "Trabalhei acordes",
  },
  {
    id: "session-2",
    songId: "song-1",
    date: "2026-02-10",
    minutes: 45,
    notes: "",
  },
];

export const folder = {
  name: "Rock",
  color: "#7c3aed",
};
