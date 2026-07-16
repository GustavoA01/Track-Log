import type { FolderType, SongType } from "@/data/types";

export const folders: FolderType[] = [
  { id: "folder-1", name: "Rock", color: "#0d9488" },
  { id: "folder-2", name: "Violão", color: "#2563eb" },
];

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
  notes: "Focar no refrão",
  imageUrl: "https://example.com/wonderwall.jpg",
  videoUrl: "https://www.youtube.com/watch?v=abc123",
  tabUrl: "https://example.com/tab",
  sessionsTotalTime: 90,
};

export const validFormValues = {
  title: "Wonderwall",
  artist: "Oasis",
  status: "learning" as const,
  difficulty: 3,
  imageUrl: "",
  videoUrl: "",
  tabUrl: "",
  genre: "Rock",
  instrument: "Violão",
  notes: "",
  folderIds: [],
};
