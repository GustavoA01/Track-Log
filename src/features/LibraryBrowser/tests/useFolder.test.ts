import { act, renderHook } from "@testing-library/react";
import { useFolder } from "../hooks/useFolder";

describe("useFolder", () => {
  const setSelectedFolderId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("selects folder when not selected", () => {
    const { result } = renderHook(() =>
      useFolder({
        folderId: "folder-1",
        isSelected: false,
        setSelectedFolderId,
      }),
    );

    act(() => {
      result.current.toggleSelection();
    });

    expect(setSelectedFolderId).toHaveBeenCalledWith("folder-1");
  });

  it("clears folder when already selected", () => {
    const { result } = renderHook(() =>
      useFolder({
        folderId: "folder-1",
        isSelected: true,
        setSelectedFolderId,
      }),
    );

    act(() => {
      result.current.toggleSelection();
    });

    expect(setSelectedFolderId).toHaveBeenCalledWith(null);
  });

  it("opens edit and delete dialogs", () => {
    const { result } = renderHook(() =>
      useFolder({
        folderId: "folder-1",
        isSelected: false,
        setSelectedFolderId,
      }),
    );

    act(() => {
      result.current.openEditDialog();
    });

    expect(result.current.editOpen).toBe(true);

    act(() => {
      result.current.openDeleteDialog();
    });

    expect(result.current.deleteOpen).toBe(true);
  });

  it("clears selection when selected folder is deleted", () => {
    const { result } = renderHook(() =>
      useFolder({
        folderId: "folder-1",
        isSelected: true,
        setSelectedFolderId,
      }),
    );

    act(() => {
      result.current.handleDeleted();
    });

    expect(setSelectedFolderId).toHaveBeenCalledWith(null);
  });

  it("does not clear selection when folder is not selected", () => {
    const { result } = renderHook(() =>
      useFolder({
        folderId: "folder-1",
        isSelected: false,
        setSelectedFolderId,
      }),
    );

    act(() => {
      result.current.handleDeleted();
    });

    expect(setSelectedFolderId).not.toHaveBeenCalled();
  });
});
