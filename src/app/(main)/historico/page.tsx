import { Suspense } from "react";
import { HistoryContent } from "@/features/Home/container/HistoryContent";
import HistoryLoading from "./loading";

const HistoryPage = () => (
  <Suspense fallback={<HistoryLoading />}>
    <HistoryContent />
  </Suspense>
);

export default HistoryPage;
