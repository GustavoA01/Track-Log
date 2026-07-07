import { act, renderHook } from "@testing-library/react";
import { useStartSessionDialog } from "../hooks/useStartSessionDialog";

describe("useStartSessionDialog", () => {
  it("submits minutes and closes dialog", () => {
    const onStart = jest.fn();
    const { result } = renderHook(() => useStartSessionDialog(onStart));

    act(() => {
      result.current.handleOpenChange(true);
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.onSubmit({ minutes: 45 });
    });

    expect(onStart).toHaveBeenCalledWith(45);
    expect(result.current.open).toBe(false);
    expect(result.current.methods.getValues("minutes")).toBe(30);
  });

  it("resets form on cancel", () => {
    const { result } = renderHook(() => useStartSessionDialog(jest.fn()));

    act(() => {
      result.current.methods.setValue("minutes", 60);
      result.current.onCancel();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.methods.getValues("minutes")).toBe(30);
  });

  it("resets form when dialog closes", () => {
    const { result } = renderHook(() => useStartSessionDialog(jest.fn()));

    act(() => {
      result.current.handleOpenChange(true);
      result.current.methods.setValue("minutes", 15);
      result.current.handleOpenChange(false);
    });

    expect(result.current.open).toBe(false);
    expect(result.current.methods.getValues("minutes")).toBe(30);
  });
});
