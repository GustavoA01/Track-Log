import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "../hooks/useLoginForm";

describe("useLoginForm", () => {
  it("logs values on submit", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.onSubmit({
        email: "ana@email.com",
        password: "senha123",
      });
    });

    expect(logSpy).toHaveBeenCalledWith("login submit", {
      email: "ana@email.com",
      password: "senha123",
    });

    logSpy.mockRestore();
  });
});
