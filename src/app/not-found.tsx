import { RouteStatusPage } from "@/components/RouteStatusPage";

const NotFoundPage = () => (
  <RouteStatusPage
    code="404"
    title="Página não encontrada"
    description="Esse caminho não existe ou a música/pasta que você procura foi removida."
  />
);

export default NotFoundPage;
