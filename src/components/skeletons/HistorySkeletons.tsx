import { Skeleton } from "@/components/ui/skeleton";

export const HistorySkeleton = () => (
  <main
    className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="space-y-2">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-4 w-64 max-w-full" />
    </div>

    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-20 rounded-xl" />
      ))}
    </div>
  </main>
);
