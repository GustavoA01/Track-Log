import type { PracticeSessionType } from "@/data/types";
import { useState } from "react";

type UseSongSessionsProps = {
  sessions: PracticeSessionType[];
};

export const useSongSessions = ({ sessions }: UseSongSessionsProps) => {
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const sessionsTotalTime = sessions.reduce(
    (acc, session) => acc + session.minutes,
    0,
  );

  return {
    sessionsTotalTime,
    clearDialogOpen,
    setClearDialogOpen,
  };
};
