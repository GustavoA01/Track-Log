import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../container/RegisterForm";

const registerWithEmail = jest.fn();
const updateAccount = jest.fn();
const useAuth = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/components/providers/useAuthProvider", () => ({
  useAuth: () => useAuth(),
}));

jest.mock("@/services/firebase/email-auth", () => ({
  registerWithEmail: (...args: unknown[]) => registerWithEmail(...args),
  updateAccount: (...args: unknown[]) => updateAccount(...args),
  getFirebaseAuthErrorMessage: () => "Erro",
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    registerWithEmail.mockResolvedValue({ uid: "user-1" });
    useAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  });

  it("submits registration data", async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/nome/i), "Ana");
    await user.type(screen.getByLabelText(/e-mail/i), "ana@email.com");
    await user.type(screen.getByLabelText(/^senha$/i), "senha123");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(registerWithEmail).toHaveBeenCalledWith({
      name: "Ana",
      email: "ana@email.com",
      password: "senha123",
    });
  });

  it("shows validation error for empty fields", async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByText("Nome é obrigatório")).toBeInTheDocument();
    expect(registerWithEmail).not.toHaveBeenCalled();
  });

  it("prefills and submits account updates in edit mode", async () => {
    const user = userEvent.setup();
    useAuth.mockReturnValue({
      user: {
        displayName: "Ana",
        email: "ana@email.com",
      },
      isLoading: false,
      isAuthenticated: true,
    });
    updateAccount.mockResolvedValue({ uid: "user-1" });

    render(<RegisterForm isEdit />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Ana")).toBeInTheDocument();
      expect(screen.getByDisplayValue("ana@email.com")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /salvar alterações/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/senha atual/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nova senha/i)).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/nome/i));
    await user.type(screen.getByLabelText(/nome/i), "Ana Clara");
    await user.click(
      screen.getByRole("button", { name: /salvar alterações/i }),
    );

    expect(updateAccount).toHaveBeenCalledWith({
      name: "Ana Clara",
      email: "ana@email.com",
      password: "",
      currentPassword: "",
    });
  });
});
