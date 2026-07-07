import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EndSessionFormFooter } from "../components/EndSessionFormFooter";

describe("EndSessionFormFooter", () => {
  it("renders action buttons", () => {
    render(<EndSessionFormFooter isSubmitting={false} onDiscard={jest.fn()} />);

    expect(
      screen.getByRole("button", { name: "Descartar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Salvar sessão" }),
    ).toHaveAttribute("form", "end-session-form");
  });

  it("shows submitting state", () => {
    render(<EndSessionFormFooter isSubmitting onDiscard={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Salvando..." })).toBeDisabled();
  });

  it("calls onDiscard", async () => {
    const onDiscard = jest.fn();
    const user = userEvent.setup();

    render(<EndSessionFormFooter isSubmitting={false} onDiscard={onDiscard} />);

    await user.click(screen.getByRole("button", { name: "Descartar" }));

    expect(onDiscard).toHaveBeenCalledTimes(1);
  });
});
