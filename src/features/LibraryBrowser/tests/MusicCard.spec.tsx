import { render, screen } from "@testing-library/react";
import { MusicCard } from "../components/MusicCard";
import { folders, songs } from "./test-data";

describe("MusicCard", () => {
  it("renders song details and link", () => {
    render(<MusicCard folders={folders} song={songs[0]!} sessionCount={3} />);

    const link = screen.getByRole("link", { name: /wonderwall/i });

    expect(link).toHaveAttribute("href", "/musica/song-1");
    expect(screen.getByText("Oasis")).toBeInTheDocument();
    expect(screen.getByText("Aprendendo")).toBeInTheDocument();
    expect(screen.getByText("3 sessões")).toBeInTheDocument();
  });

  it("renders cover image when song has imageUrl", () => {
    const songWithImage = {
      ...songs[0]!,
      imageUrl: "https://example.com/wonderwall.jpg",
    };

    render(
      <MusicCard folders={folders} song={songWithImage} sessionCount={0} />,
    );

    expect(screen.getByRole("img", { name: "Wonderwall" })).toHaveAttribute(
      "src",
      "https://example.com/wonderwall.jpg",
    );
  });
});
