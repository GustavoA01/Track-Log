import { AuthGuard } from "@/features/Auth/container/AuthGuard";

type HistoricoLayoutProps = {
  children: React.ReactNode;
};

const HistoricoLayout = ({ children }: HistoricoLayoutProps) => (
  <AuthGuard mode="protected">{children}</AuthGuard>
);

export default HistoricoLayout;
