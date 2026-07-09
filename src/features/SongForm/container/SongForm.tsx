"use client";
import { ImageIcon, NotebookPen } from "lucide-react";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  songFormDefaultValues,
  songToFormValues,
} from "@/data/schemas/song-form";
import type { FolderType, SongType } from "@/data/types";
import { FormFieldLabel } from "@/features/SongForm/components/FormFieldLabel";
import { FormFooter } from "@/features/SongForm/components/FormFooter";
import { SongImagePreview } from "@/components/SongImagePreview";
import { useSongForm } from "../hooks/useSongForm";
import { BasicFields } from "./BasicFields";
import { ExtraFields } from "./ExtraFields";
import { FolderFields } from "./FolderFields";

type SongFormProps = {
  song?: SongType | null;
  folders?: FolderType[];
  initialFolderIds?: string[];
};

export const SongForm = ({
  song,
  folders = [],
  initialFolderIds,
}: SongFormProps) => {
  const {
    methods,
    reset,
    handleSubmit,
    isSaving,
    isEditing,
    handleCancel,
    imageUrl,
    register,
  } = useSongForm(song, initialFolderIds);

  useEffect(() => {
    if (song) {
      reset(songToFormValues(song));
      return;
    }

    if (initialFolderIds?.length) {
      reset({
        ...songFormDefaultValues,
        folderIds: initialFolderIds,
      });
    }
  }, [song, initialFolderIds, reset]);

  return (
    <Card>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <CardContent className="mb-2 space-y-8">
            <BasicFields />
            {folders.length > 0 && <FolderFields folders={folders} />}

            <div>
              <h2 className="text-sm font-medium">Capa e recursos</h2>
              <p className="text-sm text-muted-foreground">
                Links para imagem, vídeo de referência e tablatura.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start">
              <div className="mx-auto w-full max-w-[180px] space-y-2 lg:mx-0">
                <FormFieldLabel icon={ImageIcon}>Prévia da capa</FormFieldLabel>
                <SongImagePreview imageUrl={imageUrl || undefined} />
              </div>

              <ExtraFields />
            </div>

            <div className="space-y-2">
              <FormFieldLabel htmlFor="notes" icon={NotebookPen}>
                Anotações
              </FormFieldLabel>
              <Textarea
                id="notes"
                placeholder="Observações sobre o que praticar, dificuldades..."
                rows={4}
                {...register("notes")}
              />
            </div>
          </CardContent>

          <FormFooter
            isSaving={isSaving}
            submitLabel={isEditing ? "Salvar alterações" : "Criar música"}
            handleCancel={handleCancel}
          />
        </form>
      </FormProvider>
    </Card>
  );
};
