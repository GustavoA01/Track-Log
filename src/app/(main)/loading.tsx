import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => (
  <main
    className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72 max-w-full" />
    </div>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-24 rounded-xl" />
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-28 shrink-0 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
      <Skeleton className="hidden h-80 rounded-xl lg:block" />
    </div>
  </main>
);

export default Loading;
