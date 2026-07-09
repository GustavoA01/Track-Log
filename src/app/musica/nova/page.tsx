import { notFound } from "next/navigation";
import { getFolders } from "@/actions/folders/getFolders";
import { getSongById } from "@/actions/songs/getSongById";
import { SongFormLayout } from "@/features/SongForm/components/SongFormLayout";
import { SongForm } from "@/features/SongForm/container/SongForm";

const NewSongPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ songId?: string; folderId?: string }>;
}) => {
  const { songId, folderId } = await searchParams;
  const [song, folders] = await Promise.all([
    songId ? getSongById(songId) : Promise.resolve(null),
    getFolders(),
  ]);

  if (songId && !song) notFound();

  const isEditing = Boolean(song);

  return (
    <SongFormLayout
      title={isEditing ? "Editar música" : "Nova música"}
      description={
        isEditing
          ? "Atualize os dados da faixa."
          : "Cadastre uma faixa para acompanhar seu progresso."
      }
      backHref={isEditing ? undefined : "/"}
    >
      <SongForm
        song={song}
        folders={folders}
        initialFolderIds={folderId ? [folderId] : undefined}
      />
    </SongFormLayout>
  );
};

export default NewSongPage;
