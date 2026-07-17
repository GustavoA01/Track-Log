import { AuthGuard } from "@/features/Auth/container/AuthGuard";

type MusicLayoutProps = {
  children: React.ReactNode;
};

const MusicLayout = ({ children }: MusicLayoutProps) => (
  <AuthGuard mode="protected">
    <div className="min-h-full pb-16 sm:pb-0">{children}</div>
  </AuthGuard>
);

export default MusicLayout;
