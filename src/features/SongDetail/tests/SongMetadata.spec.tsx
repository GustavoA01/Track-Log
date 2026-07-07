import { render, screen } from "@testing-library/react";
import { SongMetadata } from "../components/SongMetadata";
import { song } from "./test-data";

describe("SongMetadata", () => {
  it("renders metadata fields", () => {
    render(<SongMetadata song={song} />);

    expect(
      screen.getByRole("heading", { name: "Informações" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Detalhes da música")).toBeInTheDocument();
    expect(screen.getByText("Data de criação")).toBeInTheDocument();
    expect(screen.getByText("15/01/2026")).toBeInTheDocument();
    expect(screen.getByText("Instrumento")).toBeInTheDocument();
    expect(screen.getByText("Violão")).toBeInTheDocument();
    expect(screen.getByText("Gênero")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Dificuldade")).toBeInTheDocument();
    expect(screen.getByText("3/5")).toBeInTheDocument();
  });

  it("omits optional fields when empty", () => {
    render(
      <SongMetadata
        song={{
          ...song,
          instrument: "",
          genre: "",
          difficulty: 0,
        }}
      />,
    );

    expect(screen.getByText("Data de criação")).toBeInTheDocument();
    expect(screen.queryByText("Instrumento")).not.toBeInTheDocument();
    expect(screen.queryByText("Gênero")).not.toBeInTheDocument();
    expect(screen.queryByText("Dificuldade")).not.toBeInTheDocument();
  });
});
