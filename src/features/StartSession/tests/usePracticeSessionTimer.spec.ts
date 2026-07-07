import { act, renderHook } from "@testing-library/react";
import { usePracticeSessionTimer } from "../hooks/usePracticeSessionTimer";

describe("usePracticeSessionTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("starts session with formatted remaining time", () => {
    const { result } = renderHook(() => usePracticeSessionTimer());

    act(() => {
      result.current.handleStartSession(30);
    });

    expect(result.current.isTimerActive).toBe(true);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.remainingTime).toBe("30:00");
    expect(result.current.sessionProgress).toBe(0);
  });

  it("counts down while active", () => {
    const { result } = renderHook(() => usePracticeSessionTimer());

    act(() => {
      result.current.handleStartSession(1);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.remainingTime).toBe("00:59");

    act(() => {
      jest.advanceTimersByTime(59000);
    });

    expect(result.current.remainingTime).toBe("00:00");
    expect(result.current.isTimerActive).toBe(false);
  });

  it("pauses and resumes the timer", () => {
    const { result } = renderHook(() => usePracticeSessionTimer());

    act(() => {
      result.current.handleStartSession(5);
    });

    act(() => {
      result.current.handleTogglePause();
    });

    expect(result.current.isPaused).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.remainingTime).toBe("05:00");

    act(() => {
      result.current.handleTogglePause();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.remainingTime).toBe("04:59");
  });

  it("opens end session dialog on stop request", () => {
    const { result } = renderHook(() => usePracticeSessionTimer());

    act(() => {
      result.current.handleStartSession(15);
      result.current.handleRequestStop();
    });

    expect(result.current.isPaused).toBe(true);
    expect(result.current.isEndSessionOpen).toBe(true);
    expect(result.current.getElapsedMinutes()).toBeGreaterThanOrEqual(1);
  });

  it("resets timer on end session", () => {
    const { result } = renderHook(() => usePracticeSessionTimer());

    act(() => {
      result.current.handleStartSession(10);
      result.current.handleEndSession();
    });

    expect(result.current.isTimerActive).toBe(false);
    expect(result.current.isEndSessionOpen).toBe(false);
    expect(result.current.remainingTime).toBe("00:00");
    expect(result.current.sessionProgress).toBe(0);
  });

  it("does not toggle pause while end dialog is open", () => {
    const { result } = renderHook(() => usePracticeSessionTimer());

    act(() => {
      result.current.handleStartSession(10);
      result.current.handleRequestStop();
    });

    act(() => {
      result.current.handleTogglePause();
    });

    expect(result.current.isPaused).toBe(true);
  });
});
