import { render, screen } from "@testing-library/react";
import { MusicListItem } from "../components/MusicListItem";
import { songs } from "./test-data";

describe("MusicListItem", () => {
  it("renders song info and link", () => {
    render(<MusicListItem song={songs[0]!} sessionCount={3} />);

    const link = screen.getByRole("link", { name: /wonderwall/i });

    expect(link).toHaveAttribute("href", "/musica/song-1");
    expect(screen.getByText("Oasis")).toBeInTheDocument();
    expect(screen.getByText("Aprendendo")).toBeInTheDocument();
    expect(screen.getByText("3 sessões")).toBeInTheDocument();
  });

  it("uses singular session label", () => {
    render(<MusicListItem song={songs[1]!} sessionCount={1} />);

    expect(screen.getByText("1 sessão")).toBeInTheDocument();
  });
});
