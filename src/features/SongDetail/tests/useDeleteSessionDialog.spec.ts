import { act, renderHook } from "@testing-library/react";
import type { PracticeSessionType } from "@/data/types";
import { useDeleteSessionDialog } from "../hooks/useDeleteSessionDialog";

const mutateAsync = jest.fn();

jest.mock("../hooks/useDeleteSessionMutation", () => ({
  useDeleteSessionMutation: jest.fn(() => ({
    mutateAsync,
    isPending: false,
  })),
}));

import { useDeleteSessionMutation } from "../hooks/useDeleteSessionMutation";

const mockUseDeleteSessionMutation =
  useDeleteSessionMutation as jest.MockedFunction<
    typeof useDeleteSessionMutation
  >;

const session: PracticeSessionType = {
  id: "session-1",
  songId: "song-1",
  date: "2026-02-01",
  minutes: 30,
  notes: "Teste",
};

describe("useDeleteSessionDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mutateAsync.mockResolvedValue(undefined);
    mockUseDeleteSessionMutation.mockReturnValue({
      mutateAsync,
      isPending: false,
    });
  });

  it("opens dialog with selected session", () => {
    const { result } = renderHook(() => useDeleteSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
    });

    expect(result.current.open).toBe(true);
    expect(result.current.session).toEqual(session);
  });

  it("deletes session and closes dialog on confirm", async () => {
    const { result } = renderHook(() => useDeleteSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
    });

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(mutateAsync).toHaveBeenCalledWith("session-1");
    expect(result.current.open).toBe(false);
    expect(result.current.session).toBeNull();
  });

  it("closes dialog when open change is false", () => {
    const { result } = renderHook(() => useDeleteSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
      result.current.handleOpenChange(false);
    });

    expect(result.current.open).toBe(false);
  });

  it("blocks close while deletion is pending", () => {
    mockUseDeleteSessionMutation.mockReturnValue({
      mutateAsync,
      isPending: true,
    });

    const { result } = renderHook(() => useDeleteSessionDialog("song-1"));

    act(() => {
      result.current.openDialog(session);
      result.current.closeDialog();
    });

    expect(result.current.open).toBe(true);
  });
});
