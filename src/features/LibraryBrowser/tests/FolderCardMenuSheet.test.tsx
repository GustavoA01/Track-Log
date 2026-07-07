import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FolderCardMenuSheet } from "../components/FolderCardMenuSheet";

describe("FolderCardMenuSheet", () => {
  it("renders folder actions when open", () => {
    render(
      <FolderCardMenuSheet
        folderName="Rock"
        open
        onOpenChange={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Ações da pasta")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /editar pasta/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /excluir pasta/i }),
    ).toBeInTheDocument();
  });

  it("calls action handlers", async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const user = userEvent.setup();

    render(
      <FolderCardMenuSheet
        folderName="Rock"
        open
        onOpenChange={jest.fn()}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole("button", { name: /editar pasta/i }));
    await user.click(screen.getByRole("button", { name: /excluir pasta/i }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
