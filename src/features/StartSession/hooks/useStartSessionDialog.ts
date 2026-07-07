import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StartSessionValuesType,
  startSessionSchema,
} from "@/data/schemas/start-session";

export const useStartSessionDialog = (onStart: (minutes: number) => void) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<StartSessionValuesType>({
    resolver: zodResolver(startSessionSchema),
    defaultValues: { minutes: 30 },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) methods.reset({ minutes: 30 });
  };

  const onCancel = () => {
    methods.reset({ minutes: 30 });
    setOpen(false);
  };

  const onSubmit = (values: StartSessionValuesType) => {
    onStart(values.minutes);
    methods.reset({ minutes: 30 });
    setOpen(false);
  };

  return { open, methods, handleOpenChange, onCancel, onSubmit };
};
