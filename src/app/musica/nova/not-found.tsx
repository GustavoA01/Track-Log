import { RouteStatusPage } from "@/components/RouteStatusPage";

const SongFormNotFoundPage = () => (
  <RouteStatusPage
    code="404"
    title="Música não encontrada"
    description="Não encontramos a faixa que você tentou editar."
    primaryLabel="Criar nova música"
    primaryHref="/musica/nova"
  />
);

export default SongFormNotFoundPage;
