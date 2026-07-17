import { Skeleton } from "@/components/ui/skeleton";

const DetailsLoading = () => (
  <div className="min-h-full bg-background" aria-busy="true" aria-live="polite">
    <div className="border-b bg-background/80">
      <div className="container mx-auto flex h-14 items-center gap-3 px-4 sm:px-6">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>

    <section className="w-full bg-muted/40">
      <div className="container mx-auto px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:gap-12">
          <Skeleton className="aspect-square w-full max-w-[280px] rounded-2xl lg:max-w-[360px]" />
          <div className="w-full max-w-xl space-y-4 text-center lg:text-left">
            <Skeleton className="mx-auto h-5 w-24 lg:mx-0" />
            <Skeleton className="mx-auto h-9 w-64 max-w-full lg:mx-0" />
            <Skeleton className="mx-auto h-4 w-40 lg:mx-0" />
            <div className="flex justify-center gap-2 lg:justify-start">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="mx-auto h-11 w-48 rounded-lg lg:mx-0" />
          </div>
        </div>
      </div>
    </section>

    <div className="container mx-auto space-y-6 px-4 py-8 sm:px-6">
      <Skeleton className="h-28 rounded-xl" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  </div>
);

export default DetailsLoading;
