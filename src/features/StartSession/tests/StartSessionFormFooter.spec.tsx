import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StartSessionFormFooter } from "../components/StartSessionFormFooter";

describe("StartSessionFormFooter", () => {
  it("renders action buttons", () => {
    render(
      <StartSessionFormFooter isSubmitting={false} onCancel={jest.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar cronômetro" }),
    ).toHaveAttribute("form", "start-session-form");
  });

  it("shows submitting state", () => {
    render(<StartSessionFormFooter isSubmitting onCancel={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Iniciando..." })).toBeDisabled();
  });

  it("calls onCancel", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup();

    render(<StartSessionFormFooter isSubmitting={false} onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
