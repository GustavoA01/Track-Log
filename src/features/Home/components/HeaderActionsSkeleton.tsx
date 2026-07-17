import { Skeleton } from "@/components/ui/skeleton";

export const HeaderActionsSkeleton = () => (
  <div
    className="flex shrink-0 items-center gap-1"
    role="status"
    aria-label="Carregando ações do cabeçalho"
  >
    <Skeleton className="size-7 rounded-lg sm:w-24" />
    <Skeleton className="h-7 w-24 rounded-lg" />
    <Skeleton className="size-8 rounded-full" />
  </div>
);
