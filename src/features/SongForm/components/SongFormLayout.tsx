import { BackButton } from "@/components/BackButton";

type SongFormLayoutProps = {
  title: string;
  description: string;
  backHref?: string;
  children: React.ReactNode;
};

export const SongFormLayout = ({
  title,
  description,
  backHref,
  children,
}: SongFormLayoutProps) => (
  <div className="min-h-full bg-background">
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-6">
        <BackButton href={backHref} />
      </div>
    </header>
    <main className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </main>
  </div>
);
