"use client";
import { RouteStatusPage } from "@/components/RouteStatusPage";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => (
  <RouteStatusPage
    title="Algo deu errado"
    description="Não foi possível carregar esta página. Tente novamente ou volte ao início."
    reset={reset}
  />
);

export default ErrorPage;
