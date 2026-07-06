import { render, screen } from "@testing-library/react";
import { SessionHistoryItem } from "@/components/SessionHistoryItem";
import type { PracticeSessionType, SongType } from "@/data/types";

describe("SessionHistoryItem", () => {
  const session: PracticeSessionType = {
    id: "session-1",
    songId: "song-1",
    date: "2026-06-21",
    minutes: 30,
    notes: "Boa sessão",
  };

  const song: Pick<SongType, "id" | "title" | "artist"> = {
    id: "song-1",
    title: "Blackbird",
    artist: "The Beatles",
  };

  it("renders title, artist, notes and duration", () => {
    render(<SessionHistoryItem session={session} song={song} />);

    expect(screen.getByText("Blackbird")).toBeInTheDocument();
    expect(screen.getByText("The Beatles")).toBeInTheDocument();
    expect(screen.getByText("Boa sessão")).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
    expect(screen.getByText("21/06/2026")).toBeInTheDocument();
  });

  it("renders link to the song", () => {
    render(<SessionHistoryItem session={session} song={song} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/musica/song-1");
    expect(screen.getByText("Blackbird")).toBeInTheDocument();
  });

  it("does not render notes when empty", () => {
    render(
      <SessionHistoryItem session={{ ...session, notes: "" }} song={song} />,
    );

    expect(screen.queryByText("Boa sessão")).not.toBeInTheDocument();
  });
});
