import { Badge } from "@/components/ui/badge";
import { FolderType } from "@/data/types";
import { X } from "lucide-react";

type FolderBadgeProps = {
  folder: Pick<FolderType, "name" | "color">;
  onRemoveFolder: () => void;
};

export const FolderBadge = ({ folder, onRemoveFolder }: FolderBadgeProps) => (
  <Badge
    variant="outline"
    className="gap-1 pr-1"
    style={{
      borderColor: `color-mix(in srgb, ${folder.color} 40%, var(--border))`,
    }}
  >
    <span
      className="size-2 rounded-full"
      style={{ backgroundColor: folder.color }}
    />
    {folder.name}
    <button
      type="button"
      className="rounded-full p-0.5 hover:bg-muted"
      aria-label={`Remover da pasta ${folder.name}`}
      onClick={onRemoveFolder}
    >
      <X className="size-3" />
    </button>
  </Badge>
);
