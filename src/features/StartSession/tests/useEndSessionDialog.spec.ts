import { act, renderHook } from "@testing-library/react";
import { useEndSessionDialog } from "../hooks/useEndSessionDialog";

describe("useEndSessionDialog", () => {
  it("saves notes and resets form", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    const onDiscard = jest.fn();

    const { result } = renderHook(() =>
      useEndSessionDialog({ onSave, onDiscard, isSubmitting: false }),
    );

    act(() => {
      result.current.methods.setValue("notes", "  Trabalhei acordes  ");
    });

    await act(async () => {
      await result.current.onSubmit({ notes: "  Trabalhei acordes  " });
    });

    expect(onSave).toHaveBeenCalledWith("  Trabalhei acordes  ");
    expect(result.current.methods.getValues("notes")).toBe("");
  });

  it("discards session and resets form", () => {
    const onSave = jest.fn();
    const onDiscard = jest.fn();

    const { result } = renderHook(() =>
      useEndSessionDialog({ onSave, onDiscard, isSubmitting: false }),
    );

    act(() => {
      result.current.methods.setValue("notes", "Teste");
      result.current.handleDiscard();
    });

    expect(onDiscard).toHaveBeenCalledTimes(1);
    expect(result.current.methods.getValues("notes")).toBe("");
  });

  it("blocks discard while submitting", () => {
    const onDiscard = jest.fn();

    const { result } = renderHook(() =>
      useEndSessionDialog({
        onSave: jest.fn(),
        onDiscard,
        isSubmitting: true,
      }),
    );

    act(() => {
      result.current.handleDiscard();
    });

    expect(onDiscard).not.toHaveBeenCalled();
  });

  it("discards when dialog closes", () => {
    const onDiscard = jest.fn();

    const { result } = renderHook(() =>
      useEndSessionDialog({
        onSave: jest.fn(),
        onDiscard,
        isSubmitting: false,
      }),
    );

    act(() => {
      result.current.handleOpenChange(false);
    });

    expect(onDiscard).toHaveBeenCalledTimes(1);
  });
});
