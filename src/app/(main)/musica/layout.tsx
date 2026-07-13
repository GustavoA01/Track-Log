import { AuthGuard } from "@/features/Auth/container/AuthGuard";

type MusicLayoutProps = {
  children: React.ReactNode;
};

const MusicLayout = ({ children }: MusicLayoutProps) => (
  <AuthGuard mode="protected">{children}</AuthGuard>
);

export default MusicLayout;
