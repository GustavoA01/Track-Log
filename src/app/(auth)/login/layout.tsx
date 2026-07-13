import { AuthGuard } from "@/features/Auth/container/AuthGuard";

const LoginLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard mode="guest">{children}</AuthGuard>
);

export default LoginLayout;
