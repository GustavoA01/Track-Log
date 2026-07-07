import { FormProvider } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { StartSessionDialogHeader } from "../components/StartSessionDialogHeader";
import { StartSessionFormFooter } from "../components/StartSessionFormFooter";
import { StartSessionFormFields } from "./StartSessionFormFields";
import { useStartSessionDialog } from "../hooks/useStartSessionDialog";

type StartSessionDialogProps = {
  onStart: (minutes: number) => void;
  trigger: React.ReactElement;
};

export const StartSessionDialog = ({
  onStart,
  trigger,
}: StartSessionDialogProps) => {
  const { open, methods, handleOpenChange, onCancel, onSubmit } =
    useStartSessionDialog(onStart);

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
