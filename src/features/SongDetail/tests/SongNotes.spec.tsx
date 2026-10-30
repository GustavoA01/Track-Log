import { render, screen } from "@testing-library/react";
import { SongNotes } from "../components/SongNotes";

describe("SongNotes", () => {
  it("links to the song form with the notes focus target", () => {
    render(<SongNotes songId="song-1" notes="Praticar o refrão" />);

    expect(screen.getByText("Praticar o refrão")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Editar anotações" }),
    ).toHaveAttribute("href", "/musica/nova/?songId=song-1&focus=notes#notes");
  });

  it("offers the shortcut even when the song has no notes", () => {
    render(<SongNotes songId="song-1" notes="" />);

    expect(
      screen.getByText("Nenhuma anotação por enquanto."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Editar anotações" }),
    ).toBeInTheDocument();
  });
});
