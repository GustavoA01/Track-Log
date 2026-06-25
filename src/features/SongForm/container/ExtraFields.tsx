import { FormFieldLabel } from "../components/FormFieldLabel";
import { ImageIcon, PlayCircle, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/FieldError";
import { useFormContext } from "react-hook-form";
import { SongFormValuesType } from "@/data/schemas/song-form";

export const ExtraFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SongFormValuesType>();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <FormFieldLabel htmlFor="imageUrl" icon={ImageIcon}>
          URL da imagem
        </FormFieldLabel>
        <Input
          id="imageUrl"
          type="url"
          placeholder="https://..."
          aria-invalid={!!errors.imageUrl}
          {...register("imageUrl")}
        />
        <FieldError message={errors.imageUrl?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="videoUrl" icon={PlayCircle}>
          Vídeo de referência
        </FormFieldLabel>
        <Input
          id="videoUrl"
          type="url"
          placeholder="YouTube, Vimeo..."
          aria-invalid={!!errors.videoUrl}
          {...register("videoUrl")}
        />
        <FieldError message={errors.videoUrl?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="tabUrl" icon={ExternalLink}>
          Link da tablatura
        </FormFieldLabel>
        <Input
          id="tabUrl"
          type="url"
          placeholder="Songsterr, cifra club..."
          aria-invalid={!!errors.tabUrl}
          {...register("tabUrl")}
        />
        <FieldError message={errors.tabUrl?.message} />
      </div>
    </div>
  );
};
