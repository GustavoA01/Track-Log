import { SongFormLayout } from "@/features/SongForm/components/SongFormLayout";
import { SongForm } from "@/features/SongForm/container/SongForm";

const NewSongPage = () => {
  return (
    <SongFormLayout
      title="Nova música"
      description="Cadastre uma faixa para acompanhar seu progresso."
      backHref="/"
    >
      <SongForm />
    </SongFormLayout>
  );
};

export default NewSongPage;
