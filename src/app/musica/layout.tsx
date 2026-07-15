import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AuthGuard } from "@/features/Auth/container/AuthGuard";

type MusicLayoutProps = {
  children: React.ReactNode;
};

const MusicLayout = ({ children }: MusicLayoutProps) => (
  <AuthGuard mode="protected">
    <div className="pb-16 sm:pb-0">{children}</div>
    <MobileBottomNav />
  </AuthGuard>
);

export default MusicLayout;
