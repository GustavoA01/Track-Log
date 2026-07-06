import { render, screen } from "@testing-library/react";
import { FieldError } from "@/components/FieldError";

describe("FieldError", () => {
  it("renders nothing without a message", () => {
    const { container } = render(<FieldError />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the error message", () => {
    render(<FieldError message="Campo obrigatório" />);

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });
});
