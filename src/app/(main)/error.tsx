"use client";
import { RouteStatusPage } from "@/components/RouteStatusPage";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const MainErrorPage = ({ reset }: ErrorPageProps) => (
  <RouteStatusPage
    title="Não foi possível carregar"
    description="Houve um problema ao buscar suas músicas ou sessões. Tente novamente."
    reset={reset}
  />
);

export default MainErrorPage;
