import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionActionsDropDown } from "../components/SessionActionsDropD";
import { SessionsActionsSheet } from "../components/SessionsActionsSheet";

describe("SessionActionsDropDown", () => {
  it("calls onEdit and onDelete from menu items", async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const user = userEvent.setup();

    render(<SessionActionsDropDown onEdit={onEdit} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: "Opções da sessão" }));
    await user.click(await screen.findByText("Editar"));
    await user.click(screen.getByRole("button", { name: "Opções da sessão" }));
    await user.click(await screen.findByText("Excluir"));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

describe("SessionsActionsSheet", () => {
  it("calls onEdit and onDelete from sheet actions", async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const user = userEvent.setup();

    render(<SessionsActionsSheet onEdit={onEdit} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: "Opções da sessão" }));
    expect(
      await screen.findByText("Gerencie os dados dessa sessão"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /editar/i }));
    expect(onEdit).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Opções da sessão" }));
    await user.click(screen.getByRole("button", { name: /excluir/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
