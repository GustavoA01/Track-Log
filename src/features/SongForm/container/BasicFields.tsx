import { FormFieldLabel } from "../components/FormFieldLabel";
import { Music2, Mic2, ToggleLeft, Tags, Guitar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/FieldError";
import { StatusSelect } from "../components/StatusSelect";
import { useFormContext } from "react-hook-form";
import { SongFormValuesType } from "@/data/schemas/song-form";

export const BasicFields = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SongFormValuesType>();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-2 sm:col-span-2 lg:col-span-3">
        <FormFieldLabel htmlFor="title" icon={Music2}>
          Título*
        </FormFieldLabel>
        <Input
          id="title"
          placeholder="Nome da música"
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        <FieldError message={errors.title?.message} />
      </div>

      <div className="space-y-2 sm:col-span-2 lg:col-span-3">
        <FormFieldLabel htmlFor="artist" icon={Mic2}>
          Artista*
        </FormFieldLabel>
        <Input
          id="artist"
          placeholder="Nome do artista ou banda"
          aria-invalid={!!errors.artist}
          {...register("artist")}
        />
        <FieldError message={errors.artist?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="status" icon={ToggleLeft}>
          Status
        </FormFieldLabel>
        <StatusSelect control={control} />
        <FieldError message={errors.status?.message} />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="genre" icon={Tags}>
          Gênero
        </FormFieldLabel>
        <Input
          id="genre"
          placeholder="Rock, MPB, Jazz..."
          {...register("genre")}
        />
      </div>

      <div className="space-y-2">
        <FormFieldLabel htmlFor="instrument" icon={Guitar}>
          Instrumento
        </FormFieldLabel>
        <Input
          id="instrument"
          placeholder="Violão, guitarra..."
          {...register("instrument")}
        />
      </div>
    </div>
  );
};
