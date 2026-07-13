"use client";
import { RouteStatusPage } from "@/components/RouteStatusPage";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const MusicDetailErrorPage = ({ reset }: ErrorPageProps) => (
  <RouteStatusPage
    title="Erro ao abrir a música"
    description="Não conseguimos carregar os dados desta faixa. Tente novamente."
    reset={reset}
  />
);

export default MusicDetailErrorPage;
