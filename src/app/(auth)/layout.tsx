import type { Metadata } from "next";
import { AuthGuard } from "@/features/Auth/container/AuthGuard";

export const metadata: Metadata = {
  title: "Track Log · Conta",
  description: "Acesse ou crie sua conta no Track Log",
};

const AuthGroupLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard mode="guest">
    <div className="min-h-full">{children}</div>
  </AuthGuard>
);

export default AuthGroupLayout;
