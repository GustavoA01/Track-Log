import { render, screen } from "@testing-library/react";
import { SessionHistoryList } from "@/components/SessionHistoryList";
import type { PracticeSessionType, SongType } from "@/data/types";

describe("SessionHistoryList", () => {
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
      notes: "",
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
      notes: "",
      sessionsTotalTime: 20,
    },
  ];

  it("shows empty message when there are no sessions", () => {
    render(<SessionHistoryList sessions={[]} songs={songs} />);

    expect(
      screen.getByText("Nenhuma sessão registrada ainda."),
    ).toBeInTheDocument();
  });

  it("renders sessions with song data", () => {
    const sessions: PracticeSessionType[] = [
      {
        id: "s1",
        songId: "song-1",
        date: "2026-06-21",
        minutes: 30,
        notes: "Boa sessão",
      },
      {
        id: "s2",
        songId: "song-2",
        date: "2026-06-20",
        minutes: 45,
        notes: "",
      },
    ];

    render(<SessionHistoryList sessions={sessions} songs={songs} />);

    expect(screen.getAllByText("Blackbird").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Wonderwall").length).toBeGreaterThan(0);
    expect(screen.getAllByText("30 min").length).toBeGreaterThan(0);
    expect(screen.getAllByText("45 min").length).toBeGreaterThan(0);
  });

  it("respects the session display limit", () => {
    const sessions: PracticeSessionType[] = [
      {
        id: "s1",
        songId: "song-1",
        date: "2026-06-21",
        minutes: 30,
        notes: "",
      },
      {
        id: "s2",
        songId: "song-2",
        date: "2026-06-20",
        minutes: 45,
        notes: "",
      },
      {
        id: "s3",
        songId: "song-1",
        date: "2026-06-18",
        minutes: 60,
        notes: "",
      },
    ];

    render(<SessionHistoryList sessions={sessions} songs={songs} limit={2} />);

    expect(screen.getAllByText("30 min")).toHaveLength(1);
    expect(screen.getAllByText("45 min")).toHaveLength(1);
    expect(screen.queryByText("60 min")).not.toBeInTheDocument();
  });
});
