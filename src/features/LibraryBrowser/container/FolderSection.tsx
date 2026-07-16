import type { FolderType, SongType } from "@/data/types";
import { AllMusicCard } from "../components/AllMusicCard";
import { ClearFilterButton } from "../components/ClearFilterButton";
import { FolderCard } from "./FolderCard";

export const FolderSection = ({
  folders,
  songs,
  selectedFolderId,
  setSelectedFolderId,
}: {
  folders: FolderType[];
  songs: SongType[];
  selectedFolderId: string | null;
  setSelectedFolderId: (folderId: string | null) => void;
}) => (
  <section className="space-y-3">
    <ClearFilterButton
      selectedFolderId={selectedFolderId}
      setSelectedFolderId={setSelectedFolderId}
    />

    <div className="flex min-w-0 max-w-full gap-3 overflow-x-auto pb-1">
      <AllMusicCard
        songs={songs}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />

      {folders.map((folder: FolderType) => {
        const count = songs.filter((song) =>
          song.folderIds.includes(folder.id),
        ).length;
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
