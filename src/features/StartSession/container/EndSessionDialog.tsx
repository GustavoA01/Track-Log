import { FormProvider } from "react-hook-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EndSessionDialogHeader } from "../components/EndSessionDialogHeader";
import { EndSessionFormFooter } from "../components/EndSessionFormFooter";
import { EndSessionFormFields } from "./EndSessionFormFields";
import { useEndSessionDialog } from "../hooks/useEndSessionDialog";

type EndSessionDialogProps = {
  open: boolean;
  songTitle: string;
  songArtist: string;
  minutes: number;
  isSubmitting?: boolean;
  onSave: (notes: string) => void | Promise<void>;
  onDiscard: () => void;
};

export const EndSessionDialog = ({
  open,
  songTitle,
  songArtist,
  minutes,
  isSubmitting = false,
  onSave,
  onDiscard,
}: EndSessionDialogProps) => {
  const { methods, handleDiscard, handleOpenChange, onSubmit } =
    useEndSessionDialog({
      onSave,
      onDiscard,
      isSubmitting,
    });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={!isSubmitting}>
        <EndSessionDialogHeader
          songTitle={songTitle}
          songArtist={songArtist}
          minutes={minutes}
        />
        <FormProvider {...methods}>
          <form id="end-session-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <EndSessionFormFields />
          </form>
        </FormProvider>
        <EndSessionFormFooter
          onDiscard={handleDiscard}
          isSubmitting={isSubmitting || methods.formState.isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
