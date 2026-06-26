"use client";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  folderFormDefaultValues,
  folderFormSchema,
  type FolderFormValuesType,
} from "@/data/schemas/folder-form";
import { FolderDialogHeader } from "../components/FolderDialogHeader";
import { FolderFormFooter } from "../components/FolderFormFooter";
import { NewFolderTrigger } from "../components/NewFolderTrigger";
import { FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FolderFormFields } from "./FolderFormFields";

export const FolderDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const methods = useForm<FolderFormValuesType>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: folderFormDefaultValues,
  });

  const onCancel = () => {
    methods.reset();
    setOpen(false);
  };

  const onSubmit = (values: FolderFormValuesType) => {
    setIsSaving(true);

    try {
      console.log(values);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <NewFolderTrigger />
      <DialogContent className="sm:max-w-md">
        <FolderDialogHeader />
        <FormProvider {...methods}>
          <form
            id="new-folder-form"
            className="space-y-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FolderFormFields />
          </form>
        </FormProvider>

        <FolderFormFooter isSaving={isSaving} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};
