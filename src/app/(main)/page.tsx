import { Suspense } from "react";
import { HomeContent } from "@/features/Home/container/HomeContent";
import HomeLoading from "./loading";

const HomePage = () => (
  <Suspense fallback={<HomeLoading />}>
    <HomeContent />
  </Suspense>
);

export default HomePage;
