import { Suspense } from "react";
import { AuthGuard } from "@/features/Auth/container/AuthGuard";
import { AuthLoading } from "@/features/Home/components/AuthLoading";

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<AuthLoading />}>
    <AuthGuard mode="guest">{children}</AuthGuard>
  </Suspense>
);

export default ForgotPasswordLayout;
