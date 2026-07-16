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
    const { container } = render(
      <CoverImage alt="Wonderwall" fallbackColor="#0d9488" />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector(".lucide-music")).toBeInTheDocument();
  });

  it("renders folder fallback icon when requested", () => {
    const { container } = render(
      <CoverImage alt="Rock" fallbackIcon="folder" fallbackColor="#2563eb" />,
    );

    expect(container.querySelector(".lucide-folder-open")).toBeInTheDocument();
  });

  it("applies size class for small covers", () => {
    const { container } = render(
      <CoverImage alt="Wonderwall" size="sm" fallbackColor="#0d9488" />,
    );

    expect(container.firstChild).toHaveClass("size-10");
  });
});
