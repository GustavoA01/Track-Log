import { act, renderHook, waitFor } from "@testing-library/react";
import { useLoginForm } from "../hooks/useLoginForm";

const push = jest.fn();
const refresh = jest.fn();
const toastSuccess = jest.fn();
const toastError = jest.fn();
const loginWithEmail = jest.fn();
let searchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
  useSearchParams: () => searchParams,
}));

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
  },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  loginWithEmail: (...args: unknown[]) => loginWithEmail(...args),
  getFirebaseAuthErrorMessage: () => "E-mail ou senha incorretos.",
}));

describe("useLoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    searchParams = new URLSearchParams();
  });

  it("logs in and redirects on success", async () => {
    loginWithEmail.mockResolvedValue({ uid: "user-1" });
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({
        email: "ana@email.com",
        password: "senha123",
      });
    });

    expect(loginWithEmail).toHaveBeenCalledWith({
      email: "ana@email.com",
      password: "senha123",
    });
    expect(toastSuccess).toHaveBeenCalledWith("Login realizado!");
    expect(push).toHaveBeenCalledWith("/");
    expect(refresh).toHaveBeenCalled();
  });

  it("redirects to next path after login when present", async () => {
    searchParams = new URLSearchParams("next=/historico");
    loginWithEmail.mockResolvedValue({ uid: "user-1" });
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({
        email: "ana@email.com",
        password: "senha123",
      });
    });

    expect(push).toHaveBeenCalledWith("/historico");
  });

  it("ignores unsafe next paths", async () => {
    searchParams = new URLSearchParams("next=https://evil.com");
    loginWithEmail.mockResolvedValue({ uid: "user-1" });
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({
        email: "ana@email.com",
        password: "senha123",
      });
    });

    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows error toast on failure", async () => {
    loginWithEmail.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({
        email: "ana@email.com",
        password: "senha123",
      });
    });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("E-mail ou senha incorretos.");
    });
    expect(push).not.toHaveBeenCalled();
  });
});
