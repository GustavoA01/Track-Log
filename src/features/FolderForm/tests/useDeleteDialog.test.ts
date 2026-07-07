import { act, renderHook } from "@testing-library/react";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

const mutateAsync = jest.fn();

jest.mock("../hooks/useDeleteFolderMutation", () => ({
  useDeleteFolderMutation: jest.fn(() => ({
    mutateAsync,
    isPending: false,
  })),
}));

import { useDeleteFolderMutation } from "../hooks/useDeleteFolderMutation";

const mockUseDeleteFolderMutation =
  useDeleteFolderMutation as jest.MockedFunction<
    typeof useDeleteFolderMutation
  >;

describe("useDeleteDialog", () => {
  const onDeleted = jest.fn();
  const onOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mutateAsync.mockResolvedValue(undefined);

    mockUseDeleteFolderMutation.mockReturnValue({
      mutateAsync,
      isPending: false,
    });
  });

  it("deletes folder and closes dialog on confirm", async () => {
    const { result } = renderHook(() =>
      useDeleteDialog("folder-1", onDeleted, onOpenChange),
    );

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(mutateAsync).toHaveBeenCalledWith("folder-1");
    expect(onDeleted).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("forwards open change when not pending", () => {
    const { result } = renderHook(() =>
      useDeleteDialog("folder-1", onDeleted, onOpenChange),
    );

    act(() => {
      result.current.handleOpenChange(true);
    });

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("blocks open change while deletion is pending", () => {
    mockUseDeleteFolderMutation.mockReturnValue({
      mutateAsync,
      isPending: true,
    });

    const { result } = renderHook(() =>
      useDeleteDialog("folder-1", onDeleted, onOpenChange),
    );

    act(() => {
      result.current.handleOpenChange(false);
    });

    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
