import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HistorySessions } from "../components/HistorySessions";
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
];

const createSessions = (count: number): PracticeSessionType[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `s${index + 1}`,
    songId: "song-1",
    date: "2026-06-21",
    minutes: 30,
    notes: `Sessão ${index + 1}`,
  }));

describe("HistorySessions", () => {
  it("shows load more and reveals additional sessions", async () => {
    const user = userEvent.setup();
    const sessions = createSessions(25);

    render(<HistorySessions sessions={sessions} songs={songs} />);

    expect(screen.getAllByRole("link")).toHaveLength(20);
    expect(
      screen.getByRole("button", { name: "Carregar mais" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Carregar mais" }));

    expect(screen.getAllByRole("link")).toHaveLength(25);
    expect(
      screen.queryByRole("button", { name: "Carregar mais" }),
    ).not.toBeInTheDocument();
  });

  it("hides load more when there are 20 or fewer sessions", () => {
    render(<HistorySessions sessions={createSessions(5)} songs={songs} />);

    expect(
      screen.queryByRole("button", { name: "Carregar mais" }),
    ).not.toBeInTheDocument();
  });
});
