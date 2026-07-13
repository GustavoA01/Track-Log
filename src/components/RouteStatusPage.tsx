import Link from "next/link";
import { Music } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RouteStatusPageProps = {
  code?: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  reset?: () => void;
};

export const RouteStatusPage = ({
  code,
  title,
  description,
  primaryHref = "/",
  primaryLabel = "Voltar ao início",
  reset,
}: RouteStatusPageProps) => (
  <div className="flex min-h-full flex-col items-center justify-center bg-background px-4 py-16">
    <div className="flex w-full max-w-md flex-col items-center text-center">
      <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Music className="size-5" />
      </div>

      {code && (
        <p className="mb-2 font-montserrat text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          {code}
        </p>
      )}

      <h1 className="font-montserrat text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <Link href={primaryHref} className={cn(buttonVariants())}>
          {primaryLabel}
        </Link>
        {reset && (
          <Button type="button" variant="outline" onClick={reset}>
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  </div>
);
