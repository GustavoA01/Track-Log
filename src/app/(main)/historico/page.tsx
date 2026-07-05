import { HomeHeader } from "@/components/HomeHeader";
import { SessionHistoryList } from "@/components/SessionHistoryList";
import { getSongs } from "@/actions/songs/getSongs";
import {
  getAllPracticeSessions,
  getTotalPracticeMinutes,
} from "@/data/mock-data";

const HistoryPage = async () => {
  const songs = await getSongs();
  const sessions = getAllPracticeSessions();
  const totalMinutes = getTotalPracticeMinutes();

  return (
    <div className="min-h-full bg-background">
      <HomeHeader />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Histórico</h1>
          <p className="text-muted-foreground">
            {sessions.length}{" "}
            {sessions.length === 1
              ? "sessão registrada"
              : "sessões registradas"}{" "}
            · {totalMinutes} min praticados
          </p>
        </section>

        <SessionHistoryList sessions={sessions} songs={songs} />
      </main>
    </div>
  );
};

export default HistoryPage;
