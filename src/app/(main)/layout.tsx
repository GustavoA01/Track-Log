import { MobileBottomNav } from "@/components/MobileBottomNav";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <div className="pb-16 sm:pb-0">{children}</div>
    <MobileBottomNav />
  </>
);

export default MainLayout;
