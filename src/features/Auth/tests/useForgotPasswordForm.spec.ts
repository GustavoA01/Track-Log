import { act, renderHook, waitFor } from "@testing-library/react";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

const push = jest.fn();
const toastSuccess = jest.fn();
const toastError = jest.fn();
const sendPasswordReset = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
  },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  sendPasswordReset: (...args: unknown[]) => sendPasswordReset(...args),
  getFirebaseAuthErrorMessage: () => "E-mail inválido.",
}));

describe("useForgotPasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("opens confirmation with the typed email", async () => {
    const { result } = renderHook(() => useForgotPasswordForm());

    act(() => {
      result.current.onSubmit({ email: "ana@email.com" });
    });

    expect(result.current.isConfirmOpen).toBe(true);
    expect(result.current.pendingEmail).toBe("ana@email.com");
    expect(sendPasswordReset).not.toHaveBeenCalled();
  });

  it("sends reset email after confirmation", async () => {
    sendPasswordReset.mockResolvedValue(undefined);
    const { result } = renderHook(() => useForgotPasswordForm());

    act(() => {
      result.current.onSubmit({ email: "ana@email.com" });
    });

    await act(async () => {
      await result.current.onConfirmSend();
    });

    expect(sendPasswordReset).toHaveBeenCalledWith("ana@email.com");
    expect(toastSuccess).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith("/login");
  });

  it("shows error toast when sending fails", async () => {
    sendPasswordReset.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useForgotPasswordForm());

    act(() => {
      result.current.onSubmit({ email: "ana@email.com" });
    });

    await act(async () => {
      await result.current.onConfirmSend();
    });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("E-mail inválido.");
    });
    expect(push).not.toHaveBeenCalled();
  });
});
