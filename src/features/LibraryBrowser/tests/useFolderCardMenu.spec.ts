import { act, renderHook } from "@testing-library/react";
import { useFolderCardMenu } from "../hooks/useFolderCardMenu";

describe("useFolderCardMenu", () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("opens the sheet menu", () => {
    const { result } = renderHook(() =>
      useFolderCardMenu({ onEdit, onDelete }),
    );

    act(() => {
      result.current.openSheet();
    });

    expect(result.current.sheetOpen).toBe(true);
  });

  it("closes sheet and calls onEdit", () => {
    const { result } = renderHook(() =>
      useFolderCardMenu({ onEdit, onDelete }),
    );

    act(() => {
      result.current.openSheet();
      result.current.handleSheetEdit();
    });

    expect(result.current.sheetOpen).toBe(false);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("closes sheet and calls onDelete", () => {
    const { result } = renderHook(() =>
      useFolderCardMenu({ onEdit, onDelete }),
    );

    act(() => {
      result.current.openSheet();
      result.current.handleSheetDelete();
    });

    expect(result.current.sheetOpen).toBe(false);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onEdit).not.toHaveBeenCalled();
  });
});
