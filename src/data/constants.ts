import {
  ExternalLink,
  History as HistoryIcon,
  Home,
  PlayCircle,
} from "lucide-react";
import type { SongStatusConfig, SongStatusType, StatusItemType } from "./types";

export const statusItens: StatusItemType[] = [
  { label: "Todos", value: "all" },
  { label: "Aprendida", value: "learned" },
  { label: "Aprendendo", value: "learning" },
  { label: "Pausada", value: "paused" },
  { label: "Quero aprender", value: "want_to_learn" },
];

export const statusColors: Record<StatusItemType["value"], string> = {
  all: "text-muted-foreground dark:text-muted-foreground",
  learned: "text-green-800 dark:text-green-200",
  learning: "text-teal-800 dark:text-teal-200",
  paused: "text-red-800 dark:text-red-200",
  want_to_learn: "text-amber-800 dark:text-amber-200",
};

export const songStatusConfig: Record<SongStatusType, SongStatusConfig> = {
  learning: {
    label: "Aprendendo",
    badgeClassName: `border-teal-300/80 bg-teal-100 ${statusColors.learning} dark:border-teal-400/40 dark:bg-teal-500/20`,
    selectTriggerClassName:
      "border-teal-300/60 bg-teal-50/80 dark:border-teal-400/30 dark:bg-teal-500/10",
  },
  want_to_learn: {
    label: "Quero aprender",
    badgeClassName: `border-amber-300/80 bg-amber-100 ${statusColors.want_to_learn} dark:border-amber-400/40 dark:bg-amber-500/20`,
    selectTriggerClassName:
      "border-amber-300/60 bg-amber-50/80 dark:border-amber-400/30 dark:bg-amber-500/10",
  },
  learned: {
    label: "Aprendida",
    badgeClassName: `border-green-300/80 bg-green-100 ${statusColors.learned} dark:border-green-400/40 dark:bg-green-500/20`,
    selectTriggerClassName:
      "border-green-300/60 bg-green-50/80 dark:border-green-400/30 dark:bg-green-500/10",
  },
  paused: {
    label: "Pausada",
    badgeClassName: `border-red-300/80 bg-red-100 ${statusColors.paused} dark:border-red-400/40 dark:bg-red-500/20`,
    selectTriggerClassName:
      "border-red-300/60 bg-red-50/80 dark:border-red-400/30 dark:bg-red-500/10",
  },
};

export const bottomNavigationLinks = [
  { href: "/", label: "Início" },
  { href: "/historico", label: "Histórico" },
] as const;

export const tabsNavigation = [
  { href: "/", label: "Início", icon: Home },
  { href: "/historico", label: "Histórico", icon: HistoryIcon },
] as const;

export const videoResourceDefaults = {
  title: "Vídeo de referência",
  description: "Assista a uma performance ou aula para guiar seu estudo.",
  emptyLabel: "Nenhum vídeo adicionado ainda.",
  linkLabel: "Abrir vídeo",
  icon: PlayCircle,
};

export const tabResourceDefaults = {
  title: "Tablatura",
  description:
    "Guarde o link da cifra ou tab para consultar durante a prática.",
  emptyLabel: "Nenhuma tablatura adicionada ainda.",
  linkLabel: "Abrir tablatura",
  icon: ExternalLink,
};

export const authErrorMessages = {
  "auth/email-already-in-use": "Este e-mail já está em uso.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/weak-password": "A senha é muito fraca.",
  "auth/requires-recent-login": "Informe sua senha atual para continuar.",
  "auth/too-many-requests":
    "Muitas tentativas. Aguarde um momento e tente novamente.",
};
