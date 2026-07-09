import { act, renderHook } from "@testing-library/react";
import { useLibraryBrowser } from "../hooks/useLibraryBrowser";
import { songs } from "./test-data";

describe("useLibraryBrowser", () => {
  it("returns all songs by default", () => {
    const { result } = renderHook(() => useLibraryBrowser({ songs }));

    expect(result.current.filteredSongs).toHaveLength(3);
    expect(result.current.selectedFolderId).toBeNull();
    expect(result.current.query).toBe("");
  });

  it("filters songs by selected folder", () => {
    const { result } = renderHook(() => useLibraryBrowser({ songs }));

    act(() => {
      result.current.setSelectedFolderId("folder-1");
    });

    expect(result.current.filteredSongs).toHaveLength(2);
    expect(result.current.filteredSongs.map((song) => song.id)).toEqual([
      "song-1",
      "song-3",
    ]);
  });

  it("filters songs by title query", () => {
    const { result } = renderHook(() => useLibraryBrowser({ songs }));

    act(() => {
      result.current.setQuery("wonder");
    });

    expect(result.current.filteredSongs).toHaveLength(1);
    expect(result.current.filteredSongs[0]?.title).toBe("Wonderwall");
  });

  it("filters songs by artist query", () => {
    const { result } = renderHook(() => useLibraryBrowser({ songs }));

    act(() => {
      result.current.setQuery("pearl");
    });

    expect(result.current.filteredSongs).toHaveLength(1);
    expect(result.current.filteredSongs[0]?.artist).toBe("Pearl Jam");
  });

  it("ignores accents when searching", () => {
    const { result } = renderHook(() => useLibraryBrowser({ songs }));

    act(() => {
      result.current.setQuery("cafe");
    });

    expect(result.current.filteredSongs).toHaveLength(1);
    expect(result.current.filteredSongs[0]?.title).toBe("Café");
  });

  it("combines folder and search filters", () => {
    const { result } = renderHook(() => useLibraryBrowser({ songs }));

    act(() => {
      result.current.setSelectedFolderId("folder-1");
      result.current.setQuery("wonder");
    });

    expect(result.current.filteredSongs).toHaveLength(1);
    expect(result.current.filteredSongs[0]?.id).toBe("song-1");
  });

  it("includes songs that belong to multiple folders", () => {
    const { result } = renderHook(() => useLibraryBrowser({ songs }));

    act(() => {
      result.current.setSelectedFolderId("folder-2");
    });

    expect(result.current.filteredSongs.map((song) => song.id)).toEqual([
      "song-2",
      "song-3",
    ]);
  });
});
