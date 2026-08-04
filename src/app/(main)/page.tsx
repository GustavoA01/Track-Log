import { Suspense } from "react";
import { HomeContent } from "@/features/Home/container/HomeContent";
import { HomeLoading } from "@/features/Home/components/HomeLoading";

const HomePage = () => (
  <Suspense fallback={<HomeLoading />}>
    <HomeContent />
  </Suspense>
);

export default HomePage;
