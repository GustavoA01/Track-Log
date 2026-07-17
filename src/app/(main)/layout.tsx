import { MobileBottomNav } from "@/components/MobileBottomNav";
import { HomeHeader } from "@/features/Home/container/HomeHeader";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
  <div>
    <div className="min-h-full bg-background pb-16 sm:pb-0">
      <HomeHeader />
      {children}
    </div>
    <MobileBottomNav />
  </div>
);

export default MainLayout;
