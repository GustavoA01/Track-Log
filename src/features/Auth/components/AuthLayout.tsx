import Link from "next/link";
import { Music } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const AuthLayout = ({
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) => (
  <div className="relative flex min-h-full flex-col bg-background">
    <div className="absolute top-4 right-4">
      <ThemeToggle />
    </div>

    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Music className="size-5" />
            <span className="sr-only">Track Log</span>
          </Link>
          <p className="font-montserrat text-sm font-semibold tracking-wide text-primary">
            Track Log
          </p>
          <h1 className="mt-2 font-montserrat text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        </div>

        {children}

        {footer && (
          <p className="text-center text-sm text-muted-foreground">{footer}</p>
        )}
      </div>
    </div>
  </div>
);
