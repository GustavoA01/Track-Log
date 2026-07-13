import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => (
  <div className="min-h-full bg-background" aria-busy="true" aria-live="polite">
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-6">
        <Skeleton className="h-8 w-24" />
      </div>
    </header>

    <main className="container mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      <div className="space-y-4 rounded-xl border p-4 sm:p-6">
        <Skeleton className="aspect-square max-w-[200px] rounded-xl" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </main>
  </div>
);

export default Loading;
