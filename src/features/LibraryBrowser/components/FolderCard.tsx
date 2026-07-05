import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FolderType } from "@/data/types";
import { DeleteFolderDialog } from "@/features/FolderForm/container/DeleteFolderDialog";
import { CoverImage } from "@/features/LibraryBrowser/components/CoverImage";
import { FolderCardMenu } from "./FolderCardMenu";
import { FolderDialog } from "@/features/FolderForm/container/FolderDialog";

type FolderCardProps = {
  folder: FolderType;
  count: number;
  isSelected: boolean;
  setSelectedFolderId: (id: string | null) => void;
};

export const FolderCard = ({
  folder,
  count,
  isSelected,
  setSelectedFolderId,
}: FolderCardProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDeleted = () => {
    if (isSelected) setSelectedFolderId(null);
  };

  const handleOnDelete = () => setDeleteOpen(true);
  const handleEdit = () => setEditOpen(true);

  return (
    <>
      <div
        className={cn(
          "relative w-28 shrink-0 rounded-xl border p-2 transition-colors hover:bg-muted/50",
          isSelected && "border-primary bg-primary/5",
        )}
      >
        <button
          type="button"
          onClick={() => setSelectedFolderId(isSelected ? null : folder.id)}
          className="flex w-full flex-col gap-2 text-left"
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

        <div className="absolute top-1 right-1">
          <FolderCardMenu onDelete={handleOnDelete} onEdit={handleEdit} />
        </div>
      </div>

      <DeleteFolderDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        folderId={folder.id}
        folderName={folder.name}
        onDeleted={handleDeleted}
      />

      <FolderDialog
        editOpen={editOpen}
        editOnOpenChange={setEditOpen}
        folderId={folder.id}
      />
    </>
  );
};
