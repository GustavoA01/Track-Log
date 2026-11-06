import { render, screen } from "@testing-library/react";
import { CoverImage } from "../components/CoverImage";

describe("CoverImage", () => {
  it("renders image when src is provided", () => {
    render(
      <CoverImage
        src="https://example.com/cover.jpg"
        alt="Wonderwall"
        size="lg"
      />,
    );

    expect(screen.getByRole("img", { name: "Wonderwall" })).toHaveAttribute(
      "src",
      "https://example.com/cover.jpg",
    );
  });

  it("renders music fallback when src is missing", () => {
    render(<CoverImage alt="Wonderwall" fallbackColor="#0d9488" />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
