import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../container/RegisterForm";

describe("RegisterForm", () => {
  it("logs form values on valid submit", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/nome/i), "Ana");
    await user.type(screen.getByLabelText(/e-mail/i), "ana@email.com");
    await user.type(screen.getByLabelText(/^senha$/i), "senha123");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(logSpy).toHaveBeenCalledWith("register submit", {
      name: "Ana",
      email: "ana@email.com",
      password: "senha123",
    });

    logSpy.mockRestore();
  });

  it("shows validation error for empty fields", async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByText("Nome é obrigatório")).toBeInTheDocument();
  });
});
