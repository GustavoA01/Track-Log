import { Folder, Song } from "@/data/types"
import { CoverImage } from "@/features/LibraryBrowser/components/CoverImage"
import { Badge } from "@/components/ui/badge"
import { songStatusVariants, songStatusLabels } from "@/data/constants"

type MusicCardProps = {
  folders: Folder[]
  song: Song
  sessionCount: number
}

export const MusicCard = ({ folders, song, sessionCount }: MusicCardProps) => (
  <button
    type="button"
    className="flex flex-col gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-muted/50"
  >
    <CoverImage
      src={song.imageUrl}
      alt={song.title}
      fallbackColor={folders.find((f: Folder) => f.id === song.folderId)?.color}
      size="lg"
    />
    <div className="min-w-0 space-y-1">
      <div className="flex items-start justify-between gap-2">
        <p className="truncate font-medium">{song.title}</p>
        <Badge variant={songStatusVariants[song.status]} className="shrink-0">
          {songStatusLabels[song.status]}
        </Badge>
      </div>
      <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
      <p className="text-xs text-muted-foreground">
        {sessionCount} {sessionCount === 1 ? "sessão" : "sessões"}
      </p>
    </div>
  </button>
)
