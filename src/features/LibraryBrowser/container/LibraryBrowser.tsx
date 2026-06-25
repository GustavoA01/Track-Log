"use client";
import { useState } from "react";
import { SearchSection } from "../components/SearchSection";
import { FolderSection } from "./FolderSection";
import { MusicsSection } from "./MusicsSection";

// function normalize(text: string) {
//   return text
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase();
// }

export const LibraryBrowser = () => {
  const [query, setQuery] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // const normalizedQuery = normalize(query.trim());

  // const filteredSongs = useMemo(() => {
  //   let result = selectedFolderId ? getSongsByFolder(selectedFolderId) : songs;

  //   if (normalizedQuery) {
  //     result = result.filter(
  //       (song) =>
  //         normalize(song.title).includes(normalizedQuery) ||
  //         normalize(song.artist).includes(normalizedQuery),
  //     );
  //   }

  //   return result;
  // }, [normalizedQuery, selectedFolderId]);

  return (
    <div className="space-y-6">
      <SearchSection query={query} setQuery={setQuery} />
      <FolderSection
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />
      <MusicsSection />
    </div>
  );
};
