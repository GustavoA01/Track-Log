import { act, renderHook } from "@testing-library/react";
import { useSongSessions } from "../hooks/useSongSessions";
import { sessions } from "./test-data";

describe("useSongSessions", () => {
  it("calculates total session time", () => {
    const { result } = renderHook(() => useSongSessions({ sessions }));

    expect(result.current.sessionsTotalTime).toBe(75);
  });

  it("controls clear dialog state", () => {
    const { result } = renderHook(() => useSongSessions({ sessions }));

    act(() => {
      result.current.setClearDialogOpen(true);
    });

    expect(result.current.clearDialogOpen).toBe(true);
  });
});
