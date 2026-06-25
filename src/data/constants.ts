import type { SongStatusType } from "./types";

type SongStatusConfig = {
  label: string;
  badgeClassName: string;
  selectTriggerClassName: string;
};

export const songStatusConfig: Record<SongStatusType, SongStatusConfig> = {
  learning: {
    label: "Aprendendo",
    badgeClassName:
      "border-violet-300/80 bg-violet-100 text-violet-800 dark:border-violet-400/40 dark:bg-violet-500/20 dark:text-violet-200",
    selectTriggerClassName:
      "border-violet-300/60 bg-violet-50/80 dark:border-violet-400/30 dark:bg-violet-500/10",
  },
  want_to_learn: {
    label: "Quero aprender",
    badgeClassName:
      "border-amber-300/80 bg-amber-100 text-amber-900 dark:border-amber-400/40 dark:bg-amber-500/20 dark:text-amber-200",
    selectTriggerClassName:
      "border-amber-300/60 bg-amber-50/80 dark:border-amber-400/30 dark:bg-amber-500/10",
  },
  learned: {
    label: "Aprendida",
    badgeClassName:
      "border-green-300/80 bg-green-100 text-green-800 dark:border-green-400/40 dark:bg-green-500/20 dark:text-green-200",
    selectTriggerClassName:
      "border-green-300/60 bg-green-50/80 dark:border-green-400/30 dark:bg-green-500/10",
  },
  paused: {
    label: "Pausada",
    badgeClassName:
      "border-red-300/80 bg-red-100 text-red-800 dark:border-red-400/40 dark:bg-red-500/20 dark:text-red-200",
    selectTriggerClassName:
      "border-red-300/60 bg-red-50/80 dark:border-red-400/30 dark:bg-red-500/10",
  },
};
