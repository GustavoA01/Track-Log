import { HomeHeader } from "@/features/Home/container/HomeHeader";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="min-h-full bg-background pb-16 sm:pb-0">
    <HomeHeader />
    {children}
  </div>
);

export default MainLayout;
