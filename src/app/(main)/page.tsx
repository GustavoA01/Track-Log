import Link from "next/link";
import { HomeHeader } from "@/components/HomeHeader";
import { RecentSessions } from "@/components/RecentSessions";
import { StatsCards } from "@/components/StatsCards";
import { buttonVariants } from "@/components/ui/button";
import { getFolders } from "@/actions/folders/getFolders";
import { getAllSessions } from "@/actions/sessions/getAllSessions";
import { getPracticeStats } from "@/actions/sessions/getPracticeStats";
import { getSessionCountsBySongId } from "@/actions/sessions/getSessionCountsBySongId";
import { getSongs } from "@/actions/songs/getSongs";
import { LibraryBrowser } from "@/features/LibraryBrowser/container/LibraryBrowser";
import { getOptionalCurrentUserId } from "@/lib/auth";
import { cn } from "@/lib/utils";

const GuestHome = () => (
  <div className="min-h-full bg-background">
    <HomeHeader />
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Seu diário de estudos musicais
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Organize músicas, registre sessões de prática e acompanhe seu
          progresso. Entre ou crie uma conta para começar.
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
  </div>
);

const Home = async () => {
  const userId = await getOptionalCurrentUserId();

  if (!userId) return <GuestHome />;

  const [folders, songs, practiceStats, sessionCounts, sessions] =
    await Promise.all([
      getFolders(),
      getSongs(),
      getPracticeStats(),
      getSessionCountsBySongId(),
      getAllSessions(),
    ]);

  return (
    <div className="min-h-full bg-background">
      <HomeHeader />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Olá, músico!
          </h1>
          <p className="text-muted-foreground">
            Veja seu progresso e continue evoluindo nas suas músicas.
          </p>
        </section>

        <StatsCards songs={songs} practiceStats={practiceStats} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LibraryBrowser
              folders={folders}
              songs={songs}
              sessionCounts={sessionCounts}
            />
          </div>
          <div className="hidden lg:block">
            <RecentSessions songs={songs} sessions={sessions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
