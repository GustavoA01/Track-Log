import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormFooter } from "../components/FormFooter";

describe("FormFooter", () => {
  it("renders submit and cancel buttons with default label", () => {
    render(<FormFooter isSaving={false} handleCancel={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
  });

  it("shows saving state and disables buttons", () => {
    render(<FormFooter isSaving handleCancel={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Salvando..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
  });

  it("uses custom submit label", () => {
    render(
      <FormFooter
        isSaving={false}
        submitLabel="Criar música"
        handleCancel={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Criar música" }),
    ).toBeInTheDocument();
  });

  it("calls handleCancel when cancel is clicked", async () => {
    const handleCancel = jest.fn();
    const user = userEvent.setup();

    render(<FormFooter isSaving={false} handleCancel={handleCancel} />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
