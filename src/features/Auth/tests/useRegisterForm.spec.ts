import { act, renderHook, waitFor } from "@testing-library/react";
import { useRegisterForm } from "../hooks/useRegisterForm";

const push = jest.fn();
const refresh = jest.fn();
const toastSuccess = jest.fn();
const toastError = jest.fn();
const registerWithEmail = jest.fn();
const updateAccount = jest.fn();
const useAuth = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
  },
}));

jest.mock("@/components/providers/useAuthProvider", () => ({
  useAuth: () => useAuth(),
}));

jest.mock("@/services/firebase/email-auth", () => ({
  registerWithEmail: (...args: unknown[]) => registerWithEmail(...args),
  updateAccount: (...args: unknown[]) => updateAccount(...args),
  getFirebaseAuthErrorMessage: () => "Este e-mail já está em uso.",
}));

describe("useRegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  });

  it("registers and redirects on success", async () => {
    registerWithEmail.mockResolvedValue({ uid: "user-1" });
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.onSubmit({
        name: "Ana",
        email: "ana@email.com",
        password: "senha123",
        currentPassword: "",
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

  it("resets form and updates account in edit mode", async () => {
    useAuth.mockReturnValue({
      user: {
        displayName: "Ana",
        email: "ana@email.com",
      },
      isLoading: false,
      isAuthenticated: true,
    });
    updateAccount.mockResolvedValue({ uid: "user-1" });

    const { result } = renderHook(() => useRegisterForm({ isEdit: true }));

    await waitFor(() => {
      expect(result.current.methods.getValues("name")).toBe("Ana");
      expect(result.current.methods.getValues("email")).toBe("ana@email.com");
    });

    await act(async () => {
      await result.current.onSubmit({
        name: "Ana Clara",
        email: "ana@email.com",
        password: "",
        currentPassword: "",
      });
    });

    expect(updateAccount).toHaveBeenCalledWith({
      name: "Ana Clara",
      email: "ana@email.com",
      password: "",
      currentPassword: "",
    });
    expect(toastSuccess).toHaveBeenCalledWith("Dados atualizados!");
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows error toast on failure", async () => {
    registerWithEmail.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.onSubmit({
        name: "Ana",
        email: "ana@email.com",
        password: "senha123",
        currentPassword: "",
      });
    });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Este e-mail já está em uso.");
    });
    expect(push).not.toHaveBeenCalled();
  });
});
