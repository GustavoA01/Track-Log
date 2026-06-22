import { cn } from "@/lib/utils";
import { Folder } from "@/data/types";
import { CoverImage } from "@/features/LibraryBrowser/components/CoverImage";

type FolderCardProps = {
  folder: Folder;
  count: number;
  isSelected: boolean;
  setSelectedFolderId: (id: string | null) => void;
};

export const FolderCard = ({
  folder,
  count,
  isSelected,
  setSelectedFolderId,
}: FolderCardProps) => (
  <button
    type="button"
    onClick={() => setSelectedFolderId(isSelected ? null : folder.id)}
    className={cn(
      "flex w-28 shrink-0 flex-col gap-2 rounded-xl border p-2 text-left transition-colors hover:bg-muted/50",
      isSelected && "border-primary bg-primary/5",
    )}
  >
    <CoverImage
      src={folder.imageUrl}
      alt={folder.name}
      fallbackColor={folder.color}
      fallbackIcon="folder"
      size="md"
    />

    <div>
      <p className="truncate text-sm font-medium">{folder.name}</p>
      <p className="text-xs text-muted-foreground">
        {count} {count === 1 ? "música" : "músicas"}
      </p>
    </div>
  </button>
);
