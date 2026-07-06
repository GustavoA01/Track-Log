import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteSessionsBySongId } from "@/actions/sessions/deleteSessionsBySongId";
import type { PracticeSessionType } from "@/data/types";

type UseSongSessionsProps = {
  sessions: PracticeSessionType[];
  songId: string;
};

export const useSongSessions = ({ sessions, songId }: UseSongSessionsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const sessionsTotalTime = sessions.reduce(
    (acc, session) => acc + session.minutes,
    0,
  );

  const handleClearSessions = () => {
    if (sessions.length === 0 || isPending) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja limpar todas as sessões desta música?",
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteSessionsBySongId(songId);
      router.refresh();
    });
  };

  return {
    sessionsTotalTime,
    handleClearSessions,
    isPending,
  };
};
