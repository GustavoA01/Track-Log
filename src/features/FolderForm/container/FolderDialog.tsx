"use client";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { getFolderById } from "@/actions/folders/getFolderById";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FolderDialogHeader } from "../components/FolderDialogHeader";
import { FolderFormFooter } from "../components/FolderFormFooter";
import { NewFolderTrigger } from "../components/NewFolderTrigger";
import { useFolderForm } from "../hooks/useFolderForm";
import { FolderFormFields } from "./FolderFormFields";

type FolderDialogProps = {
  folderId?: string;
  editOpen?: boolean;
  editOnOpenChange?: (open: boolean) => void;
};

export const FolderDialog = ({
  folderId,
  editOpen,
  editOnOpenChange,
}: FolderDialogProps) => {
  const { isEditing, open, setOpen, isSaving, methods, onCancel, onSubmit } =
    useFolderForm({
      folderId,
      open: editOpen,
      onOpenChange: editOnOpenChange,
    });

  const { reset } = methods;

  useEffect(() => {
    if (!isEditing || !folderId || !open) return;

    async function loadFolder() {
      const folder = await getFolderById(folderId!);

      if (folder) {
        reset({
          name: folder.name,
          imageUrl: folder.imageUrl ?? "",
        });
      }
    }

    loadFolder();
  }, [isEditing, folderId, open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEditing && <NewFolderTrigger />}
      <DialogContent className="sm:max-w-md">
        <FolderDialogHeader isEditing={isEditing} />
        <FormProvider {...methods}>
          <form
            id="folder-form"
            className="space-y-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FolderFormFields />
          </form>
        </FormProvider>

        <FolderFormFooter
          formId="folder-form"
          isSaving={isSaving}
          submitLabel={isEditing ? "Salvar alterações" : "Criar pasta"}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
