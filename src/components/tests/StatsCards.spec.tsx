import { render, screen } from "@testing-library/react";
import { StatsCards } from "@/components/StatsCards";
import type { SongType } from "@/data/types";

describe("StatsCards", () => {
  const songs: SongType[] = [
    {
      id: "1",
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
      id: "2",
      title: "Wonderwall",
      artist: "Oasis",
      genre: "Rock",
      instrument: "Violão",
      difficulty: 2,
      status: "learning",
      createdAt: "2025-11-20",
      notes: "",
      sessionsTotalTime: 20,
    },
    {
      id: "3",
      title: "Neon Genesis",
      artist: "Angra",
      genre: "Power Metal",
      instrument: "Guitarra",
      difficulty: 4,
      status: "learned",
      createdAt: "2026-06-10",
      notes: "",
      sessionsTotalTime: 0,
    },
    {
      id: "4",
      title: "Comfortably Numb",
      artist: "Pink Floyd",
      genre: "Rock",
      instrument: "Guitarra",
      difficulty: 5,
      status: "want_to_learn",
      createdAt: "2026-06-01",
      notes: "",
      sessionsTotalTime: 0,
    },
  ];

  const practiceStats = {
    totalMinutes: 120,
    weeklyMinutes: 45,
    sessionCount: 8,
  };

  it("renders all four stats cards", () => {
    render(<StatsCards songs={songs} practiceStats={practiceStats} />);

    expect(screen.getByText("Músicas")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2 em aprendizado")).toBeInTheDocument();

    expect(screen.getByText("Esta semana")).toBeInTheDocument();
    expect(screen.getByText("45 min")).toBeInTheDocument();

    expect(screen.getByText("Total praticado")).toBeInTheDocument();
    expect(screen.getByText("120 min")).toBeInTheDocument();
    expect(screen.getByText("8 sessões registradas")).toBeInTheDocument();

    expect(screen.getByText("Aprendidas")).toBeInTheDocument();
    expect(screen.getByText("1 na fila")).toBeInTheDocument();
  });
});
