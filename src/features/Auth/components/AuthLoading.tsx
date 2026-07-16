import Image from "next/image";
import { Loader2 } from "lucide-react";

export const AuthLoading = () => (
  <div className="flex min-h-dvh flex-col bg-background">
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <Image
          priority
          width={56}
          height={56}
          src="/logo.jpg"
          alt="Track Log"
          className="rounded-xl"
        />
        <p className="mt-4 font-montserrat text-sm font-semibold tracking-wide text-primary">
          Track Log
        </p>
        <Loader2
          className="mt-6 size-6 animate-spin text-primary"
          aria-hidden
        />
        <p className="mt-3 text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  </div>
);
