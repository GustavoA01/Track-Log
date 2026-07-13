import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../container/LoginForm";

describe("LoginForm", () => {
  it("logs form values on valid submit", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "ana@email.com");
    await user.type(screen.getByLabelText(/^senha$/i), "senha123");
    await user.click(screen.getByRole("button", { name: /^entrar$/i }));

    expect(logSpy).toHaveBeenCalledWith("login submit", {
      email: "ana@email.com",
      password: "senha123",
    });

    logSpy.mockRestore();
  });

  it("shows validation error for empty fields", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /^entrar$/i }));

    expect(await screen.findByText("Senha é obrigatória")).toBeInTheDocument();
  });
});
