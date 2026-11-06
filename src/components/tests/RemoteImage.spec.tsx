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
});
