import { render, screen } from "@testing-library/react";
import { SongCover } from "../components/SongCover";

describe("SongCover", () => {
  it("renders cover image", () => {
    render(
      <SongCover
        title="Wonderwall"
        imageUrl="https://example.com/wonderwall.jpg"
      />,
    );

    expect(screen.getByRole("img", { name: "Wonderwall" })).toHaveAttribute(
      "src",
      "https://example.com/wonderwall.jpg",
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <SongCover
        title="Wonderwall"
        imageUrl="https://example.com/wonderwall.jpg"
        className="custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
