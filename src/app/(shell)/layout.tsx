import { MobileBottomNav } from "@/components/MobileBottomNav";
import { HomeHeader } from "@/features/Home/container/HomeHeader";

type ShellLayoutProps = {
  children: React.ReactNode;
};

const ShellLayout = ({ children }: ShellLayoutProps) => (
  <>
    <div className="min-h-full bg-background pb-16 sm:pb-0">
      <HomeHeader />
      {children}
    </div>
    <MobileBottomNav />
  </>
);

export default ShellLayout;
