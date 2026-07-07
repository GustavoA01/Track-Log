import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  folderFormDefaultValues,
  folderFormSchema,
  type FolderFormValuesType,
} from "@/data/schemas/folder-form";
import { useCreateFolderMutation } from "./useCreateFolderMutation";
import { useUpdateFolderMutation } from "./useUpdateFolderMutation";

type UseFolderFormOptions = {
  folderId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const useFolderForm = ({
  folderId,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: UseFolderFormOptions = {}) => {
  const isEditing = !!folderId;
  const {
    createFolderFn,
    isPending: isCreating,
    open,
    setOpen,
  } = useCreateFolderMutation();
  const { updateFolderFn, isPending: isUpdating } = useUpdateFolderMutation();

  const methods = useForm<FolderFormValuesType>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: folderFormDefaultValues,
  });

  const dialogOpen = isEditing ? (controlledOpen ?? false) : open;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isEditing) controlledOnOpenChange?.(nextOpen);
    else setOpen(nextOpen);

    if (!nextOpen) methods.reset(folderFormDefaultValues);
  };

  const onSubmit = async (values: FolderFormValuesType) => {
    if (isEditing && folderId) {
      await updateFolderFn({ id: folderId, values });
      controlledOnOpenChange?.(false);
      methods.reset(folderFormDefaultValues);
      return;
    }

    await createFolderFn(values);
    methods.reset(folderFormDefaultValues);
  };

  return {
    isEditing,
    open: dialogOpen,
    setOpen: handleOpenChange,
    isSaving: isEditing ? isUpdating : isCreating,
    methods,
    onCancel: () => handleOpenChange(false),
    onSubmit,
  };
};
