import { cn } from "@/lib/utils";
import type { SongType } from "@/data/types";

type AllMusicCardProps = {
  songs: SongType[];
  selectedFolderId: string | null;
  setSelectedFolderId: (folderId: string | null) => void;
};

export const AllMusicCard = ({
  songs,
  selectedFolderId,
  setSelectedFolderId,
}: AllMusicCardProps) => (
  <button
    type="button"
    onClick={() => setSelectedFolderId(null)}
    className={cn(
      "flex w-28 shrink-0 flex-col gap-2 rounded-xl border p-2 text-left transition-colors hover:bg-muted/50",
      selectedFolderId === null && "border-primary bg-primary/5",
    )}
  >
    <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted">
      <span className="text-2xl font-semibold tabular-nums text-muted-foreground">
        {songs.length}
      </span>
    </div>
    <div>
      <p className="truncate text-sm font-medium">Todas</p>
      <p className="text-xs text-muted-foreground">Biblioteca</p>
    </div>
  </button>
);
