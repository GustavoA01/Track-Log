import { Suspense } from "react";
import { AuthGuard } from "@/features/Auth/container/AuthGuard";
import { AuthLoading } from "@/features/Home/components/AuthLoading";

type MusicLayoutProps = {
  children: React.ReactNode;
};

const MusicLayout = ({ children }: MusicLayoutProps) => (
  <Suspense fallback={<AuthLoading />}>
    <AuthGuard mode="protected">
      <div className="min-h-full pb-16 sm:pb-0">{children}</div>
    </AuthGuard>
  </Suspense>
);

export default MusicLayout;
