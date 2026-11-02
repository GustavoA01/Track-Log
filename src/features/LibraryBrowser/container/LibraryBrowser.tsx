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
    setStatusQuery,
    statusQuery,
    instrumentQuery,
    setInstrumentQuery,
    instrumentOptions,
    reverseSongs,
    setReverseSongs,
    sortBy,
    setSortBy,
  } = useLibraryBrowser({ songs });

  return (
    <div className="min-w-0 space-y-6">
      <SearchSection
        query={query}
        setQuery={setQuery}
        statusQuery={statusQuery}
        setStatusQuery={setStatusQuery}
        instrumentQuery={instrumentQuery}
        setInstrumentQuery={setInstrumentQuery}
        instrumentOptions={instrumentOptions}
      />
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
        reverseSongs={reverseSongs}
        setReverseSongs={setReverseSongs}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
};
