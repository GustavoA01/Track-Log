import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const GuestHome = () => (
  <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">
        Seu diário de estudos musicais
      </h1>
      <p className="max-w-xl text-muted-foreground">
        Organize músicas, registre sessões de prática e acompanhe seu progresso.
        Entre ou crie uma conta para começar.
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <Link href="/login" className={cn(buttonVariants({ size: "sm" }))}>
          Entrar
        </Link>
        <Link
          href="/cadastrar"
          className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
        >
          Criar conta
        </Link>
      </div>
    </section>
  </main>
);
