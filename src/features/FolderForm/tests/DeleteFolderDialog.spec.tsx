import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteFolderDialog } from "../container/DeleteFolderDialog";

const handleConfirm = jest.fn();
const handleOpenChange = jest.fn();

jest.mock("../hooks/useDeleteDialog", () => ({
  useDeleteDialog: jest.fn(() => ({
    handleConfirm,
    handleOpenChange,
    isPending: false,
  })),
}));

import { useDeleteDialog } from "../hooks/useDeleteDialog";

const mockUseDeleteDialog = useDeleteDialog as jest.MockedFunction<
  typeof useDeleteDialog
>;

describe("DeleteFolderDialog", () => {
  const onDeleted = jest.fn();
  const onOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDeleteDialog.mockReturnValue({
      handleConfirm,
      handleOpenChange,
      isPending: false,
    });
  });

  it("renders folder name in confirmation message", () => {
    render(
      <DeleteFolderDialog
        open
        folderId="folder-1"
        folderName="Rock"
        onDeleted={onDeleted}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByText("Excluir pasta?")).toBeInTheDocument();
    expect(screen.getByText(/Rock/)).toBeInTheDocument();
    expect(
      screen.getByText(/as músicas desta pasta não serão excluídas/i),
    ).toBeInTheDocument();
  });

  it("calls handleConfirm when delete is clicked", async () => {
    const user = userEvent.setup();

    render(
      <DeleteFolderDialog
        open
        folderId="folder-1"
        folderName="Rock"
        onDeleted={onDeleted}
        onOpenChange={onOpenChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Excluir" }));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenChange when cancel is clicked", async () => {
    const user = userEvent.setup();

    render(
      <DeleteFolderDialog
        open
        folderId="folder-1"
        folderName="Rock"
        onDeleted={onDeleted}
        onOpenChange={onOpenChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("shows pending state on delete button", () => {
    mockUseDeleteDialog.mockReturnValue({
      handleConfirm,
      handleOpenChange,
      isPending: true,
    });

    render(
      <DeleteFolderDialog
        open
        folderId="folder-1"
        folderName="Rock"
        onDeleted={onDeleted}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByRole("button", { name: "Excluindo..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
  });
});
