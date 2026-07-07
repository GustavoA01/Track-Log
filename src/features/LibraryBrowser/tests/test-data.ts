import type { FolderType, SongType } from "@/data/types";

export const folders: FolderType[] = [
  { id: "folder-1", name: "Rock", color: "#7c3aed" },
  {
    id: "folder-2",
    name: "Violão",
    color: "#2563eb",
    imageUrl: "https://example.com/folder.jpg",
  },
];

export const songs: SongType[] = [
  {
    id: "song-1",
    folderId: "folder-1",
    title: "Wonderwall",
    artist: "Oasis",
    genre: "Rock",
    instrument: "Violão",
    difficulty: 2,
    status: "learning",
    createdAt: "2026-01-01",
    notes: "",
    sessionsTotalTime: 120,
  },
  {
    id: "song-2",
    folderId: "folder-2",
    title: "Black",
    artist: "Pearl Jam",
    genre: "Rock",
    instrument: "Violão",
    difficulty: 3,
    status: "learned",
    createdAt: "2026-01-02",
    notes: "",
    sessionsTotalTime: 60,
  },
  {
    id: "song-3",
    folderId: "folder-1",
    title: "Café",
    artist: "Trilha Sonora",
    genre: "MPB",
    instrument: "Violão",
    difficulty: 1,
    status: "want_to_learn",
    createdAt: "2026-01-03",
    notes: "",
    sessionsTotalTime: 0,
  },
];

export const sessionCounts: Record<string, number> = {
  "song-1": 3,
  "song-2": 1,
  "song-3": 0,
};
