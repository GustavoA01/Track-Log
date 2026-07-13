import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ForgotPasswordForm } from "../container/ForgotPasswordForm";

const sendPasswordReset = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  sendPasswordReset: (...args: unknown[]) => sendPasswordReset(...args),
  getFirebaseAuthErrorMessage: () => "Erro",
}));

describe("ForgotPasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sendPasswordReset.mockResolvedValue(undefined);
  });

  it("asks for confirmation before sending the reset email", async () => {
    const user = userEvent.setup();

    render(<ForgotPasswordForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "ana@email.com");
    await user.click(screen.getByRole("button", { name: /continuar/i }));

    expect(
      await screen.findByRole("heading", {
        name: /enviar e-mail de redefinição/i,
      }),
    ).toBeInTheDocument();
    expect(sendPasswordReset).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /enviar e-mail/i }));

    expect(sendPasswordReset).toHaveBeenCalledWith("ana@email.com");
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();

    render(<ForgotPasswordForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "ana");
    await user.click(screen.getByRole("button", { name: /continuar/i }));

    expect(
      await screen.findByText("Informe um e-mail válido"),
    ).toBeInTheDocument();
    expect(sendPasswordReset).not.toHaveBeenCalled();
  });
});
