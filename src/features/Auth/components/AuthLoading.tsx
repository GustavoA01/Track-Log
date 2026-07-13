import { Skeleton } from "@/components/ui/skeleton";

export const AuthLoading = () => (
  <div className="flex min-h-full items-center justify-center bg-background px-4">
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="mx-auto size-12 rounded-xl" />
      <Skeleton className="mx-auto h-6 w-40" />
      <Skeleton className="mx-auto h-4 w-56" />
    </div>
  </div>
);
