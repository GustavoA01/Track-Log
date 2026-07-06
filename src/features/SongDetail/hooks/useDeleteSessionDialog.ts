import { useState } from "react";
import type { PracticeSessionType } from "@/data/types";
import { useDeleteSessionMutation } from "./useDeleteSessionMutation";

export const useDeleteSessionDialog = (songId: string) => {
  const [session, setSession] = useState<PracticeSessionType | null>(null);
  const { mutateAsync, isPending } = useDeleteSessionMutation(songId);

  const open = session !== null;

  const openDialog = (target: PracticeSessionType) => setSession(target);

  const closeDialog = () => {
    if (!isPending) setSession(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) closeDialog();
  };

  const handleConfirm = async () => {
    if (!session) return;

    await mutateAsync(session.id);
    setSession(null);
  };

  return {
    session,
    open,
    isPending,
    openDialog,
    closeDialog,
    handleOpenChange,
    handleConfirm,
  };
};
