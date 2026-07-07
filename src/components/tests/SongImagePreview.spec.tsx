import { render, screen } from "@testing-library/react";
import { SongImagePreview } from "@/components/SongImagePreview";

describe("SongImagePreview", () => {
  it("renders placeholder when imageUrl is not provided", () => {
    render(<SongImagePreview />);

    expect(screen.getByText("Prévia da capa")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders image preview when imageUrl is provided", () => {
    render(<SongImagePreview imageUrl="https://example.com/cover.jpg" />);

    const image = screen.getByRole("img", { name: "Prévia da capa" });

    expect(image).toHaveAttribute("src", "https://example.com/cover.jpg");
    expect(screen.queryByText("Prévia da capa")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <SongImagePreview
        imageUrl="https://example.com/cover.jpg"
        className="custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies folder layout class when isFolder is true", () => {
    const { container } = render(<SongImagePreview isFolder />);

    expect(container.firstChild).toHaveClass("m-auto");
  });

  it("applies folder layout class on image preview", () => {
    const { container } = render(
      <SongImagePreview imageUrl="https://example.com/cover.jpg" isFolder />,
    );

    expect(container.firstChild).toHaveClass("m-auto");
  });
});
