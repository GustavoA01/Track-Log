"use client";
import { RouteStatusPage } from "@/components/RouteStatusPage";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const SongFormErrorPage = ({ reset }: ErrorPageProps) => (
  <RouteStatusPage
    title="Erro no formulário"
    description="Não foi possível carregar o formulário de música. Tente novamente."
    reset={reset}
  />
);

export default SongFormErrorPage;
