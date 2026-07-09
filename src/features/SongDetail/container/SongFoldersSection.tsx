"use client";
import { Folder, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FolderType } from "@/data/types";
import {
  useAddSongToFolderMutation,
  useRemoveSongFromFolderMutation,
} from "../hooks/useSongFolderMutations";

type SongFoldersSectionProps = {
  songId: string;
  folders: FolderType[];
  songFolderIds: string[];
  onFolderIdsChange: (folderIds: string[]) => void;
};

export const SongFoldersSection = ({
  songId,
  folders,
  songFolderIds,
  onFolderIdsChange,
}: SongFoldersSectionProps) => {
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [removingFolderId, setRemovingFolderId] = useState<string | null>(null);
  const { mutateAsync: addToFolder, isPending: isAdding } =
    useAddSongToFolderMutation(songId);
  const { mutateAsync: removeFromFolder, isPending: isRemoving } =
    useRemoveSongFromFolderMutation(songId);

  const songFolders = useMemo(
    () => folders.filter((folder) => songFolderIds.includes(folder.id)),
    [folders, songFolderIds],
  );

  const availableFolders = useMemo(
    () => folders.filter((folder) => !songFolderIds.includes(folder.id)),
    [folders, songFolderIds],
  );

  const handleAddFolder = async () => {
    if (!selectedFolderId) {
      return;
    }

    const updatedSong = await addToFolder(selectedFolderId);
    onFolderIdsChange(updatedSong.folderIds);
    setSelectedFolderId("");
  };

  const handleRemoveFolder = async (folderId: string) => {
    setRemovingFolderId(folderId);

    try {
      const updatedSong = await removeFromFolder(folderId);
      onFolderIdsChange(updatedSong.folderIds);
    } finally {
      setRemovingFolderId(null);
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-medium">Pastas</h2>
        <p className="text-sm text-muted-foreground">
          Organize esta música em uma ou mais pastas
        </p>
      </div>

      {songFolders.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {songFolders.map((folder) => {
            const isRemovingThisFolder =
              isRemoving && removingFolderId === folder.id;

            return (
              <div key={folder.id} className="group relative">
                <Badge
                  variant="outline"
                  className="gap-1.5"
                  style={{
                    borderColor: `color-mix(in srgb, ${folder.color} 40%, var(--border))`,
                  }}
                >
                  <Folder className="size-3" />
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: folder.color }}
                  />
                  {folder.name}
                </Badge>

                <Button
                  type="button"
                  variant="destructive"
                  size="xs"
                  className="absolute -right-2 -top-2 size-6 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                  aria-label={`Remover da pasta ${folder.name}`}
                  disabled={isRemovingThisFolder}
                  onClick={() => handleRemoveFolder(folder.id)}
                >
                  <X className="size-3" />
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Esta música ainda não está em nenhuma pasta.
        </p>
      )}

      {availableFolders.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={selectedFolderId}
            onValueChange={(value) => setSelectedFolderId(value ?? "")}
            items={Object.fromEntries(
              availableFolders.map((folder) => [folder.id, folder.name]),
            )}
          >
            <SelectTrigger className="w-full sm:max-w-xs">
              <SelectValue placeholder="Selecione uma pasta" />
            </SelectTrigger>
            <SelectContent>
              {availableFolders.map((folder) => (
                <SelectItem
                  key={folder.id}
                  value={folder.id}
                  label={folder.name}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: folder.color }}
                    />
                    {folder.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            disabled={!selectedFolderId || isAdding}
            onClick={handleAddFolder}
          >
            <Plus data-icon="inline-start" />
            Adicionar à pasta
          </Button>
        </div>
      )}
    </section>
  );
};
