"use client";
import type { FolderType, SongType } from "@/data/types";
import { SearchSection } from "../components/SearchSection";
import { FolderSection } from "./FolderSection";
import { MusicsSection } from "../components/MusicsSection";
import { useLibraryBrowser } from "../hooks/useLibraryBrowser";

type LibraryBrowserProps = {
  folders: FolderType[];
  songs: SongType[];
  sessionCounts: Record<string, number>;
};

export const LibraryBrowser = ({
  folders,
  songs,
  sessionCounts,
}: LibraryBrowserProps) => {
  const {
    query,
    setQuery,
    selectedFolderId,
    setSelectedFolderId,
    filteredSongs,
  } = useLibraryBrowser({ songs });

  return (
    <div className="space-y-6">
      <SearchSection query={query} setQuery={setQuery} />
      <FolderSection
        folders={folders}
        songs={songs}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />
      <MusicsSection
        folders={folders}
        songs={filteredSongs}
        sessionCounts={sessionCounts}
        selectedFolderId={selectedFolderId}
      />
    </div>
  );
};
