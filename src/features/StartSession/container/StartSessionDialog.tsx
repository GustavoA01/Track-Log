import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  startSessionSchema,
  type StartSessionValuesType,
} from "@/data/schemas/start-session";
import { StartSessionDialogHeader } from "../components/StartSessionDialogHeader";
import { StartSessionFormFooter } from "../components/StartSessionFormFooter";
import { StartSessionFormFields } from "./StartSessionFormFields";

type StartSessionDialogProps = {
  onStart: (minutes: number) => void;
  trigger: React.ReactElement;
};

export const StartSessionDialog = ({
  onStart,
  trigger,
}: StartSessionDialogProps) => {
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-md">
        <StartSessionDialogHeader />
        <FormProvider {...methods}>
          <form
            id="start-session-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <StartSessionFormFields />
          </form>
        </FormProvider>
        <StartSessionFormFooter
          isSubmitting={methods.formState.isSubmitting}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
