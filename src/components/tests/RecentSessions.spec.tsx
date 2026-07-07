import { render, screen } from "@testing-library/react";
import { RecentSessions } from "@/components/RecentSessions";
import type { PracticeSessionType, SongType } from "@/data/types";

describe("RecentSessions", () => {
  const song: SongType = {
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
  };

  const session: PracticeSessionType = {
    id: "session-1",
    songId: "song-1",
    date: "2026-06-21",
    minutes: 30,
    notes: "Boa sessão",
  };

  it("renders header and link to full history", () => {
    render(<RecentSessions songs={[song]} sessions={[session]} />);

    expect(screen.getByText("Histórico recente")).toBeInTheDocument();
    expect(
      screen.getByText("Suas últimas sessões de estudo"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ver histórico completo" }),
    ).toHaveAttribute("href", "/historico");
  });

  it("shows recent sessions", () => {
    render(<RecentSessions songs={[song]} sessions={[session]} />);

    expect(screen.getAllByText("Blackbird").length).toBeGreaterThan(0);
  });
});
