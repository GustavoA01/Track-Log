import { Folder } from "lucide-react";
import type { FolderType } from "@/data/types";
import { FormFieldLabel } from "../components/FormFieldLabel";
import { FolderBadge } from "../components/FolderBadge";
import { SelectFolder } from "../components/SelectFolder";
import { useFolderFields } from "../hooks/useFolderFields";

type FolderFieldsProps = {
  folders: FolderType[];
};

export const FolderFields = ({ folders }: FolderFieldsProps) => {
  const {
    availableFolders,
    selectedFolders,
    handleAddFolder,
    handleRemoveFolder,
    selectedFolderId,
    setSelectedFolderId,
  } = useFolderFields(folders);

  return (
    <div className="space-y-3 sm:col-span-2 lg:col-span-3">
      <FormFieldLabel icon={Folder}>Pastas</FormFieldLabel>

      {selectedFolders.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFolders.map((folder) => (
            <FolderBadge
              key={folder.id}
              folder={folder}
              onRemoveFolder={() => handleRemoveFolder(folder.id)}
            />
          ))}
        </div>
      )}

      {availableFolders.length > 0 ? (
        <SelectFolder
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
          availableFolders={availableFolders}
          handleAddFolder={handleAddFolder}
        />
      ) : folders.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Crie uma pasta na biblioteca para organizar suas músicas.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Esta música já está em todas as suas pastas.
        </p>
      )}
    </div>
  );
};
