import { render, screen } from "@testing-library/react";
import { RemoteImage } from "@/components/RemoteImage";

describe("RemoteImage", () => {
  it("renders img with src and alt", () => {
    render(
      <RemoteImage src="https://example.com/cover.jpg" alt="Capa da música" />,
    );

    const image = screen.getByRole("img", { name: "Capa da música" });

    expect(image).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  it("applies custom className", () => {
    render(
      <RemoteImage
        src="https://example.com/cover.jpg"
        alt="Capa"
        className="rounded-lg"
      />,
    );

    expect(screen.getByRole("img")).toHaveClass("rounded-lg");
  });

  it("applies fill classes when fill is true", () => {
    render(<RemoteImage src="https://example.com/cover.jpg" alt="Capa" fill />);

    expect(screen.getByRole("img")).toHaveClass("object-cover");
  });
});
