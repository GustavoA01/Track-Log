import { render, screen } from "@testing-library/react";
import { Music2 } from "lucide-react";
import { FormFieldLabel } from "../components/FormFieldLabel";

describe("FormFieldLabel", () => {
  it("associates the label with its field", () => {
    render(
      <FormFieldLabel htmlFor="title" icon={Music2}>
        Título*
      </FormFieldLabel>,
    );

    const label = screen.getByText("Título*");

    expect(label).toHaveAttribute("for", "title");
  });
});
