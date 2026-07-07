import { ImageIcon, Type } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { FieldError } from "@/components/FieldError";
import { Input } from "@/components/ui/input";
import type { FolderFormValuesType } from "@/data/schemas/folder-form";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";
import { SongImagePreview } from "@/components/SongImagePreview";

export const FolderFormFields = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FolderFormValuesType>();

  const imageUrl = useWatch({ control, name: "imageUrl" });

  return (
    <>
      <div className="space-y-2">
        <FormFieldLabel htmlFor="folder-name" icon={Type}>
          Nome
        </FormFieldLabel>
        <Input
          id="folder-name"
          placeholder="Rock, Violão, Favoritas..."
          aria-invalid={!!errors.name}
          autoFocus
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="folder-imageUrl" icon={ImageIcon}>
          URL da imagem
        </FormFieldLabel>
        <Input
          id="folder-imageUrl"
          type="url"
          placeholder="https://..."
          aria-invalid={!!errors.imageUrl}
          {...register("imageUrl")}
        />
        <FieldError message={errors.imageUrl?.message} />
      </div>

      <SongImagePreview imageUrl={imageUrl || undefined} isFolder />
    </>
  );
};
