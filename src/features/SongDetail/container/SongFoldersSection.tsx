"use client";

import { Folder, Plus, X } from "lucide-react";
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
import { useSongFoldersSection } from "../hooks/useSongFoldersSection";

export type SongFoldersSectionProps = {
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
  const {
    songFolders,
    availableFolders,
    isRemoving,
    handleAddFolder,
    handleRemoveFolder,
    selectedFolderId,
    removingFolderId,
    setSelectedFolderId,
    selectItems,
    disableAddToFolder,
  } = useSongFoldersSection({
    songId,
    folders,
    songFolderIds,
    onFolderIdsChange,
  });

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
          {songFolders.map(({ id, name, color }) => {
            const isRemovingThisFolder = isRemoving && removingFolderId === id;

            return (
              <div key={id} className="group relative">
                <Badge
                  variant="outline"
                  className="gap-1.5"
                  style={{
                    borderColor: `color-mix(in srgb, ${color} 40%, var(--border))`,
                  }}
                >
                  <Folder className="size-3" />
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {name}
                </Badge>

                <Button
                  size="xs"
                  variant="destructive"
                  disabled={isRemovingThisFolder}
                  aria-label={`Remover da pasta ${name}`}
                  onClick={() => handleRemoveFolder(id)}
                  className="absolute -right-2 -top-2 size-6 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
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
            items={selectItems}
            value={selectedFolderId}
            onValueChange={(value) => setSelectedFolderId(value ?? "")}
          >
            <SelectTrigger className="w-full sm:max-w-xs">
              <SelectValue placeholder="Selecione uma pasta" />
            </SelectTrigger>
            <SelectContent>
              {availableFolders.map(({ id, name, color }) => (
                <SelectItem key={id} value={id} label={name}>
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span>{name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={handleAddFolder}
            disabled={disableAddToFolder}
          >
            <Plus data-icon="inline-start" />
            Adicionar à pasta
          </Button>
        </div>
      )}
    </section>
  );
};
