import { HomeHeader } from "@/components/HomeHeader";
import { RecentSessions } from "@/components/RecentSessions";
import { StatsCards } from "@/components/StatsCards";
import { getFolders } from "@/actions/folders/getFolders";
import { getSongs } from "@/actions/songs/getSongs";
import { LibraryBrowser } from "@/features/LibraryBrowser/container/LibraryBrowser";

const Home = async () => {
  const [folders, songs] = await Promise.all([getFolders(), getSongs()]);

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

        <StatsCards songs={songs} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LibraryBrowser folders={folders} songs={songs} />
          </div>
          <div>
            <RecentSessions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
