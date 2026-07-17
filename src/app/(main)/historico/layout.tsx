import { Suspense } from "react";
import { AuthGuard } from "@/features/Auth/container/AuthGuard";
import { AuthLoading } from "@/features/Home/components/AuthLoading";

type HistoricoLayoutProps = {
  children: React.ReactNode;
};

const HistoricoLayout = ({ children }: HistoricoLayoutProps) => (
  <Suspense fallback={<AuthLoading />}>
    <AuthGuard mode="protected">{children}</AuthGuard>
  </Suspense>
);

export default HistoricoLayout;
