import { act, renderHook } from "@testing-library/react";
import { useSessionHistorySearch } from "../hooks/useSessionHistorySearch";
import type { PracticeSessionType, SongType } from "@/data/types";

const songs: SongType[] = [
  {
    id: "song-1",
    title: "Blackbird",
    artist: "The Beatles",
    genre: "Rock",
    instrument: "Violão",
    difficulty: 3,
    status: "learning",
    createdAt: "2026-01-15",
    updatedAt: new Date("2026-01-15T00:00:00.000Z"),
    notes: "",
    folderIds: [],
    sessionsTotalTime: 45,
  },
  {
    id: "song-2",
    title: "Wonderwall",
    artist: "Oasis",
    genre: "Rock",
    instrument: "Violão",
    difficulty: 2,
    status: "learned",
    createdAt: "2025-11-20",
    updatedAt: new Date("2025-11-20T00:00:00.000Z"),
    notes: "",
    folderIds: [],
    sessionsTotalTime: 20,
  },
];

const sessions: PracticeSessionType[] = [
  {
    id: "s1",
    songId: "song-1",
    date: "2026-06-21",
    minutes: 30,
    notes: "Foco no solo",
  },
  {
    id: "s2",
    songId: "song-2",
    date: "2026-06-20",
    minutes: 45,
    notes: "",
  },
];

describe("useSessionHistorySearch", () => {
  it("returns all sessions when query is empty", () => {
    const { result } = renderHook(() =>
      useSessionHistorySearch({ sessions, songs }),
    );

    expect(result.current.filteredSessions).toHaveLength(2);
  });

  it("filters sessions by song title", () => {
    const { result } = renderHook(() =>
      useSessionHistorySearch({ sessions, songs }),
    );

    act(() => {
      result.current.setQuery("black");
    });

    expect(result.current.filteredSessions).toHaveLength(1);
    expect(result.current.filteredSessions[0]?.id).toBe("s1");
  });

  it("filters sessions by notes", () => {
    const { result } = renderHook(() =>
      useSessionHistorySearch({ sessions, songs }),
    );

    act(() => {
      result.current.setQuery("solo");
    });

    expect(result.current.filteredSessions).toHaveLength(1);
    expect(result.current.filteredSessions[0]?.id).toBe("s1");
  });
});
