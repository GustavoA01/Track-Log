import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conta",
  description: "Acesse ou crie sua conta no Track Log",
};

const AuthGroupLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-full">{children}</div>
);

export default AuthGroupLayout;
