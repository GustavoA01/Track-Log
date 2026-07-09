import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderType } from "@/data/types";
import { Plus } from "lucide-react";

type SelectFolderProps = {
  selectedFolderId: string;
  setSelectedFolderId: (folderId: string) => void;
  availableFolders: FolderType[];
  handleAddFolder: () => void;
};

export const SelectFolder = ({
  selectedFolderId,
  setSelectedFolderId,
  availableFolders,
  handleAddFolder,
}: SelectFolderProps) => (
  <div className="flex flex-col gap-2 sm:flex-row">
    <Select
      value={selectedFolderId}
      onValueChange={(value) => setSelectedFolderId(value ?? "")}
      items={Object.fromEntries(
        availableFolders.map((folder) => [folder.id, folder.name]),
      )}
    >
      <SelectTrigger className="w-full sm:flex-1">
        <SelectValue placeholder="Selecione uma pasta" />
      </SelectTrigger>
      <SelectContent>
        {availableFolders.map((folder) => (
          <SelectItem key={folder.id} value={folder.id} label={folder.name}>
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
      className="shrink-0"
      disabled={!selectedFolderId}
      onClick={handleAddFolder}
    >
      <Plus data-icon="inline-start" />
      Adicionar
    </Button>
  </div>
);
