import { notFound } from "next/navigation";
import { getSongById } from "@/actions/songs/getSongById";
import { SongFormLayout } from "@/features/SongForm/components/SongFormLayout";
import { SongForm } from "@/features/SongForm/container/SongForm";

const NewSongPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ songId?: string }>;
}) => {
  const { songId } = await searchParams;
  const song = songId ? await getSongById(songId) : null;

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
      <SongForm song={song} />
    </SongFormLayout>
  );
};

export default NewSongPage;
