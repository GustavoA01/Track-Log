import { render, screen } from "@testing-library/react";
import { Music2 } from "lucide-react";
import { FormFieldLabel } from "../components/FormFieldLabel";

describe("FormFieldLabel", () => {
  it("renders label text with icon", () => {
    render(
      <FormFieldLabel htmlFor="title" icon={Music2}>
        Título*
      </FormFieldLabel>,
    );

    const label = screen.getByText("Título*");

    expect(label).toHaveAttribute("for", "title");
    expect(
      label.closest("label")?.querySelector(".lucide-music2"),
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <FormFieldLabel icon={Music2} className="custom-class">
        Campo
      </FormFieldLabel>,
    );

    expect(screen.getByText("Campo")).toHaveClass("custom-class");
  });
});
