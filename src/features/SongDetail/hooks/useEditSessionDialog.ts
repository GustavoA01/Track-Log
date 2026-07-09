import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { PracticeSessionType } from "@/data/types";
import {
  editSessionDefaultValues,
  editSessionSchema,
  sessionToEditFormValues,
  type EditSessionValuesType,
} from "@/data/schemas/edit-session";
import { useUpdateSessionMutation } from "./useUpdateSessionMutation";

export const useEditSessionDialog = (songId: string) => {
  const [session, setSession] = useState<PracticeSessionType | null>(null);
  const [dateUnlocked, setDateUnlocked] = useState(false);

  const resetDialog = () => {
    setSession(null);
    setDateUnlocked(false);
  };

  const { mutateAsync, isPending } = useUpdateSessionMutation(songId, {
    onSuccess: resetDialog,
  });

  const methods = useForm<EditSessionValuesType>({
    resolver: zodResolver(editSessionSchema),
    defaultValues: editSessionDefaultValues,
  });

  const open = session !== null;

  const openDialog = (target: PracticeSessionType) => {
    setSession(target);
    methods.reset(sessionToEditFormValues(target));
    setDateUnlocked(false);
  };

  const closeDialog = () => {
    if (!isPending) {
      resetDialog();
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) closeDialog();
  };

  const toggleDateUnlocked = () => {
    setDateUnlocked((current) => !current);
  };

  const onSubmit = async (data: EditSessionValuesType) => {
    if (!session) return;

    await mutateAsync({
      sessionId: session.id,
      data: {
        minutes: data.minutes,
        notes: data.notes,
        ...(dateUnlocked ? { date: data.date } : {}),
      },
    });
  };

  return {
    session,
    open,
    isPending,
    methods,
    dateUnlocked,
    openDialog,
    closeDialog,
    handleOpenChange,
    toggleDateUnlocked,
    onSubmit,
  };
};
