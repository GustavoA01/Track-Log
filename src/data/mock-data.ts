import type { Folder, PracticeSession, Song } from "./types";

export const folders: Folder[] = [
  {
    id: "1",
    name: "Rock",
    color: "#ef4444",
    type: "genre",
    imageUrl:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1e91201?w=200&h=200&fit=crop",
  },
  { id: "2", name: "Violão", color: "#3b82f6", type: "instrument" },
  {
    id: "3",
    name: "Favoritas",
    color: "#a855f7",
    type: "custom",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938545-c1f69419868d?w=200&h=200&fit=crop",
  },
];

export const songs: Song[] = [
  {
    id: "1",
    folderId: "1",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    genre: "Rock",
    instrument: "Violão",
    difficulty: 4,
    originalBpm: 82,
    currentBpm: 65,
    status: "learning",
    progress: 45,
    notes: "Focar na parte do solo",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-7557229e927c?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    folderId: "2",
    title: "Blackbird",
    artist: "The Beatles",
    genre: "Rock",
    instrument: "Violão",
    difficulty: 3,
    originalBpm: 96,
    currentBpm: 80,
    status: "learning",
    progress: 70,
    notes: "",
  },
  {
    id: "3",
    folderId: "3",
    title: "Wonderwall",
    artist: "Oasis",
    genre: "Rock",
    instrument: "Violão",
    difficulty: 2,
    originalBpm: 87,
    currentBpm: 87,
    status: "learned",
    progress: 100,
    notes: "Completa!",
    imageUrl:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    folderId: "1",
    title: "Comfortably Numb",
    artist: "Pink Floyd",
    genre: "Rock",
    instrument: "Guitarra",
    difficulty: 5,
    originalBpm: 63,
    currentBpm: 0,
    status: "want_to_learn",
    progress: 0,
    notes: "Próxima na fila",
  },
];

export const practiceSessions: PracticeSession[] = [
  {
    id: "1",
    songId: "1",
    date: "2026-06-21",
    minutes: 45,
    bpm: 65,
    notes: "Trabalhei a transição do verso pro refrão",
  },
  {
    id: "2",
    songId: "2",
    date: "2026-06-20",
    minutes: 30,
    bpm: 75,
    notes: "Fingerpicking mais fluido",
  },
  {
    id: "3",
    songId: "1",
    date: "2026-06-18",
    minutes: 60,
    bpm: 60,
    notes: "Sessão longa, bom progresso",
  },
  {
    id: "4",
    songId: "3",
    date: "2026-06-15",
    minutes: 20,
    bpm: 87,
    notes: "Revisão final",
  },
];

export function getSongById(id: string) {
  return songs.find((song) => song.id === id);
}

export function getSongsByFolder(folderId: string) {
  return songs.filter((song) => song.folderId === folderId);
}

export function getSessionCountBySongId(songId: string) {
  return practiceSessions.filter((session) => session.songId === songId).length;
}

export function getTotalPracticeMinutes() {
  return practiceSessions.reduce((acc, session) => acc + session.minutes, 0);
}

export function getWeeklyPracticeMinutes() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return practiceSessions
    .filter((session) => new Date(session.date) >= weekAgo)
    .reduce((acc, session) => acc + session.minutes, 0);
}
