import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FolderFormFooter } from "../components/FolderFormFooter";

describe("FolderFormFooter", () => {
  it("renders cancel and submit buttons with default labels", () => {
    render(<FolderFormFooter isSaving={false} onCancel={jest.fn()} />);

    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar pasta" }),
    ).toBeInTheDocument();
  });

  it("shows saving state and disables buttons", () => {
    render(<FolderFormFooter isSaving onCancel={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Salvando..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
  });

  it("uses custom submit label and form id", () => {
    render(
      <FolderFormFooter
        formId="folder-form"
        isSaving={false}
        submitLabel="Salvar alterações"
        onCancel={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Salvar alterações" }),
    ).toHaveAttribute("form", "folder-form");
  });

  it("calls onCancel when cancel is clicked", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup();

    render(<FolderFormFooter isSaving={false} onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
