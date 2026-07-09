import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionActions } from "../components/SessionActions";

describe("SessionActions", () => {
  it("calls onEdit and onDelete from menu items", async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const user = userEvent.setup();

    render(<SessionActions onEdit={onEdit} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: "Opções da sessão" }));
    await user.click(await screen.findByText("Editar"));
    await user.click(screen.getByRole("button", { name: "Opções da sessão" }));
    await user.click(await screen.findByText("Excluir"));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
