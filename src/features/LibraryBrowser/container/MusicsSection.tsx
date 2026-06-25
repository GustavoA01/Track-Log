import { songs } from "@/data/mock-data";
import { getSessionCountBySongId } from "@/data/mock-data";
import { MusicCard } from "../components/MusicCard";
import { folders } from "@/data/mock-data";

export const MusicsSection = () => {
  return (
    <section className="space-y-3">
      <header className="flex items-center">
        <h2 className="text-sm font-medium">Músicas</h2>
        <span className="ml-1.5 font-normal text-muted-foreground">
          ({songs.length})
        </span>
      </header>

      {songs.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {songs.map((song) => {
            const sessionCount = getSessionCountBySongId(song.id);

            return (
              <MusicCard
                key={song.id}
                folders={folders}
                song={song}
                sessionCount={sessionCount}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhuma música encontrada
          </p>
        </div>
      )}
    </section>
  );
};
