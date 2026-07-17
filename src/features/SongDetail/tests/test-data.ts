import type { PracticeSessionType, SongType } from "@/data/types";

export const song: SongType = {
  id: "song-1",
  folderIds: ["folder-1"],
  title: "Wonderwall",
  artist: "Oasis",
  genre: "Rock",
  instrument: "Violão",
  difficulty: 3,
  status: "learning",
  createdAt: "2026-01-15",
  updatedAt: new Date("2026-01-15T00:00:00.000Z"),
  notes: "Focar no refrão",
  imageUrl: "https://example.com/wonderwall.jpg",
  videoUrl: "https://www.youtube.com/watch?v=6hzrDe2EK-g",
  tabUrl: "https://example.com/tab",
  accentColor: "#0d9488",
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
  id: "folder-1",
  name: "Rock",
  color: "#0d9488",
};

export const folders = [
  folder,
  { id: "folder-2", name: "Violão", color: "#2563eb" },
];
