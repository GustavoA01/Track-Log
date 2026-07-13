import { AuthGuard } from "@/features/Auth/container/AuthGuard";

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard mode="guest">{children}</AuthGuard>
);

export default ForgotPasswordLayout;
