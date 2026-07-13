import { renderHook, act } from "@testing-library/react";
import { useRegisterForm } from "../hooks/useRegisterForm";

describe("useRegisterForm", () => {
  it("logs values on submit", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      result.current.onSubmit({
        name: "Ana",
        email: "ana@email.com",
        password: "senha123",
      });
    });

    expect(logSpy).toHaveBeenCalledWith("register submit", {
      name: "Ana",
      email: "ana@email.com",
      password: "senha123",
    });

    logSpy.mockRestore();
  });
});
