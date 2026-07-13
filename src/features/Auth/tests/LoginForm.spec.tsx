import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../container/LoginForm";

const loginWithEmail = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  loginWithEmail: (...args: unknown[]) => loginWithEmail(...args),
  getFirebaseAuthErrorMessage: () => "Erro",
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loginWithEmail.mockResolvedValue({ uid: "user-1" });
  });

  it("submits login credentials", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "ana@email.com");
    await user.type(screen.getByLabelText(/^senha$/i), "senha123");
    await user.click(screen.getByRole("button", { name: /^entrar$/i }));

    expect(loginWithEmail).toHaveBeenCalledWith({
      email: "ana@email.com",
      password: "senha123",
    });
  });

  it("shows validation error for empty fields", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /^entrar$/i }));

    expect(await screen.findByText("Senha é obrigatória")).toBeInTheDocument();
    expect(loginWithEmail).not.toHaveBeenCalled();
  });
});
