import { act, renderHook } from "@testing-library/react";
import type { PracticeSessionType } from "@/data/types";
import { useEditSessionDialog } from "../hooks/useEditSessionDialog";

const mutateAsync = jest.fn();

jest.mock("../hooks/useUpdateSessionMutation", () => ({
  useUpdateSessionMutation: jest.fn(
    (_songId: string, options?: { onSuccess?: () => void }) => ({
      mutateAsync: async (...args: unknown[]) => {
        const result = await mutateAsync(...args);
        options?.onSuccess?.();
        return result;
      },
      isPending: false,
    }),
  ),
}));

import { useUpdateSessionMutation } from "../hooks/useUpdateSessionMutation";

const mockUseUpdateSessionMutation =
  useUpdateSessionMutation as jest.MockedFunction<
    typeof useUpdateSessionMutation
  >;

const session: PracticeSessionType = {
  id: "session-1",
  songId: "song-1",
  date: "2026-02-01",
  minutes: 30,
  notes: "Teste",
};

describe("useEditSessionDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mutateAsync.mockResolvedValue(undefined);
    mockUseUpdateSessionMutation.mockImplementation((_songId, options) => ({
      mutateAsync: async (...args: unknown[]) => {
        const result = await mutateAsync(...args);
        options?.onSuccess?.();
        return result;
      },
      isPending: false,
    }));
  });

  it("opens dialog with session values", () => {
    const { result } = renderHook(() => useEditSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
    });

    expect(result.current.open).toBe(true);
    expect(result.current.session).toEqual(session);
    expect(result.current.dateUnlocked).toBe(false);
    expect(result.current.methods.getValues()).toMatchObject({
      minutes: 30,
      notes: "Teste",
      date: "2026-02-01",
    });
  });

  it("does not send date when it is locked", async () => {
    const { result } = renderHook(() => useEditSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
    });

    await act(async () => {
      await result.current.onSubmit({
        minutes: 45,
        notes: "Atualizado",
        date: "2026-03-01",
      });
    });

    expect(mutateAsync).toHaveBeenCalledWith({
      sessionId: "session-1",
      data: {
        minutes: 45,
        notes: "Atualizado",
      },
    });
  });

  it("sends date when unlocked", async () => {
    const { result } = renderHook(() => useEditSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
      result.current.toggleDateUnlocked();
    });

    await act(async () => {
      await result.current.onSubmit({
        minutes: 45,
        notes: "Atualizado",
        date: "2026-03-01",
      });
    });

    expect(mutateAsync).toHaveBeenCalledWith({
      sessionId: "session-1",
      data: {
        minutes: 45,
        notes: "Atualizado",
        date: "2026-03-01",
      },
    });
  });

  it("resets date lock when dialog closes", () => {
    const { result } = renderHook(() => useEditSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
      result.current.toggleDateUnlocked();
      result.current.handleOpenChange(false);
    });

    expect(result.current.open).toBe(false);
    expect(result.current.dateUnlocked).toBe(false);
  });

  it("closes dialog after successful submit", async () => {
    const { result } = renderHook(() => useEditSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
    });

    await act(async () => {
      await result.current.onSubmit({
        minutes: 45,
        notes: "Atualizado",
        date: "2026-02-01",
      });
    });

    expect(result.current.open).toBe(false);
    expect(result.current.session).toBeNull();
    expect(result.current.dateUnlocked).toBe(false);
  });

  it("blocks close while update is pending", () => {
    mockUseUpdateSessionMutation.mockImplementation(() => ({
      mutateAsync,
      isPending: true,
    }));

    const { result } = renderHook(() => useEditSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
      result.current.closeDialog();
    });

    expect(result.current.open).toBe(true);
  });
});
