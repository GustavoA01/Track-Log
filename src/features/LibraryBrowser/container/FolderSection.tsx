import type { FolderType } from "@/data/types";
import { AllMusicCard } from "../components/AllMusicCard";
import { ClearFilterButton } from "../components/ClearFilterButton";
import { FolderCard } from "../components/FolderCard";
import { folders, getSongsByFolder } from "@/data/mock-data";
import { songs } from "@/data/mock-data";

export const FolderSection = ({
  selectedFolderId,
  setSelectedFolderId,
}: {
  selectedFolderId: string | null;
  setSelectedFolderId: (folderId: string | null) => void;
}) => {
  return (
    <section className="space-y-3">
      <ClearFilterButton
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />

      <div className="flex gap-3 overflow-x-auto pb-1">
        <AllMusicCard
          songs={songs}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />

        {folders.map((folder: FolderType) => {
          const count = getSongsByFolder(folder.id).length;
          const isSelected = selectedFolderId === folder.id;

          return (
            <FolderCard
              key={folder.id}
              folder={folder}
              count={count}
              isSelected={isSelected}
              setSelectedFolderId={setSelectedFolderId}
            />
          );
        })}
      </div>
    </section>
  );
};
