import type { PracticeSessionType } from "./types";

export const practiceSessions: PracticeSessionType[] = [
  {
    id: "1",
    songId: "1",
    date: "2026-06-21",
    minutes: 45,
    notes: "Trabalhei a transição do verso pro refrão",
  },
  {
    id: "2",
    songId: "2",
    date: "2026-06-20",
    minutes: 30,
    notes: "Fingerpicking mais fluido",
  },
  {
    id: "3",
    songId: "1",
    date: "2026-06-18",
    minutes: 60,
    notes: "Sessão longa, bom progresso",
  },
  {
    id: "4",
    songId: "3",
    date: "2026-06-15",
    minutes: 20,
    notes: "Revisão final",
  },
];

export const getAllPracticeSessions = () =>
  [...practiceSessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

export const getSessionCountBySongId = (songId: string) =>
  practiceSessions.filter((session) => session.songId === songId).length;

export const getSessionsBySongId = (songId: string) =>
  practiceSessions
    .filter((session) => session.songId === songId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getPracticeMinutesBySongId = (songId: string) =>
  getSessionsBySongId(songId).reduce(
    (acc, session) => acc + session.minutes,
    0,
  );

export const getTotalPracticeMinutes = () =>
  practiceSessions.reduce((acc, session) => acc + session.minutes, 0);

export const getWeeklyPracticeMinutes = () => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return practiceSessions
    .filter((session) => new Date(session.date) >= weekAgo)
    .reduce((acc, session) => acc + session.minutes, 0);
};
