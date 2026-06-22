import type { SongStatus } from "./types";

export const songStatusLabels: Record<SongStatus, string> = {
  learning: "Aprendendo",
  want_to_learn: "Quero aprender",
  learned: "Aprendida",
  paused: "Pausada",
};

export const songStatusVariants: Record<
  SongStatus,
  "default" | "secondary" | "outline"
> = {
  learning: "default",
  want_to_learn: "outline",
  learned: "secondary",
  paused: "outline",
};
