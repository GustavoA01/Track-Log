import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../container/RegisterForm";

const registerWithEmail = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  registerWithEmail: (...args: unknown[]) => registerWithEmail(...args),
  getFirebaseAuthErrorMessage: () => "Erro",
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    registerWithEmail.mockResolvedValue({ uid: "user-1" });
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
});
