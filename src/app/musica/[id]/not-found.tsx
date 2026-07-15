import { RouteStatusPage } from "@/components/RouteStatusPage";

const MusicNotFoundPage = () => (
  <RouteStatusPage
    code="404"
    title="Música não encontrada"
    description="Essa faixa não existe ou foi removida da sua biblioteca."
    primaryLabel="Ir para a biblioteca"
  />
);

export default MusicNotFoundPage;
