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

const createSessions = (count: number): PracticeSessionType[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `s${index + 1}`,
    songId: index % 2 === 0 ? "song-1" : "song-2",
    date: `2026-06-${String(21 - (index % 20)).padStart(2, "0")}`,
    minutes: 30,
    notes: index === 0 ? "Foco no solo" : "",
  }));

describe("useSessionHistorySearch", () => {
  it("returns all sessions when query is empty and under the initial limit", () => {
    const { result } = renderHook(() =>
      useSessionHistorySearch({ sessions, songs }),
    );

    expect(result.current.filteredSessions).toHaveLength(2);
    expect(result.current.hasMore).toBe(false);
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

  it("shows the first 20 sessions and loads 10 more", () => {
    const manySessions = createSessions(35);
    const { result } = renderHook(() =>
      useSessionHistorySearch({ sessions: manySessions, songs }),
    );

    expect(result.current.filteredSessions).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.filteredSessions).toHaveLength(30);
    expect(result.current.hasMore).toBe(true);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.filteredSessions).toHaveLength(35);
    expect(result.current.hasMore).toBe(false);
  });

  it("resets visible count when the query changes", () => {
    const manySessions = createSessions(35);
    const { result } = renderHook(() =>
      useSessionHistorySearch({ sessions: manySessions, songs }),
    );

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.filteredSessions).toHaveLength(30);

    act(() => {
      result.current.setQuery("black");
    });

    expect(result.current.filteredSessions.length).toBeLessThanOrEqual(20);
    expect(
      result.current.filteredSessions.every((s) => s.songId === "song-1"),
    ).toBe(true);
  });
});
