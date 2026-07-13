import { act, renderHook, waitFor } from "@testing-library/react";
import { useRegisterForm } from "../hooks/useRegisterForm";

const push = jest.fn();
const refresh = jest.fn();
const toastSuccess = jest.fn();
const toastError = jest.fn();
const registerWithEmail = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
  },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  registerWithEmail: (...args: unknown[]) => registerWithEmail(...args),
  getFirebaseAuthErrorMessage: () => "Este e-mail já está em uso.",
}));

describe("useRegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("registers and redirects on success", async () => {
    registerWithEmail.mockResolvedValue({ uid: "user-1" });
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.onSubmit({
        name: "Ana",
        email: "ana@email.com",
        password: "senha123",
      });
    });

    expect(registerWithEmail).toHaveBeenCalledWith({
      name: "Ana",
      email: "ana@email.com",
      password: "senha123",
    });
    expect(toastSuccess).toHaveBeenCalledWith("Conta criada!");
    expect(push).toHaveBeenCalledWith("/");
    expect(refresh).toHaveBeenCalled();
  });

  it("shows error toast on failure", async () => {
    registerWithEmail.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.onSubmit({
        name: "Ana",
        email: "ana@email.com",
        password: "senha123",
      });
    });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Este e-mail já está em uso.");
    });
    expect(push).not.toHaveBeenCalled();
  });
});
