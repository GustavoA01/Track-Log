import { HomeHeader } from "@/components/HomeHeader";
import { SessionHistoryList } from "@/components/SessionHistoryList";
import { getAllSessions } from "@/actions/sessions/getAllSessions";
import { getPracticeStats } from "@/actions/sessions/getPracticeStats";
import { getSongs } from "@/actions/songs/getSongs";

const HistoryPage = async () => {
  const [songs, sessions, practiceStats] = await Promise.all([
    getSongs(),
    getAllSessions(),
    getPracticeStats(),
  ]);

  return (
    <div className="min-h-full bg-background">
      <HomeHeader />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Histórico</h1>
          <p className="text-muted-foreground">
            {practiceStats.sessionCount}{" "}
            {practiceStats.sessionCount === 1
              ? "sessão registrada"
              : "sessões registradas"}{" "}
            · {practiceStats.totalMinutes} min praticados
          </p>
        </section>

        <SessionHistoryList sessions={sessions} songs={songs} />
      </main>
    </div>
  );
};

export default HistoryPage;
