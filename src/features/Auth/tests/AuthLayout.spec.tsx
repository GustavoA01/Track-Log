import { render, screen } from "@testing-library/react";
import { AuthLayout } from "../components/AuthLayout";

describe("AuthLayout", () => {
  it("renders brand, title, description and children", () => {
    render(
      <AuthLayout title="Entrar" description="Acesse sua conta">
        <button type="button">Ação</button>
      </AuthLayout>,
    );

    expect(screen.getAllByText("Track Log").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Entrar" })).toBeInTheDocument();
    expect(screen.getByText("Acesse sua conta")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ação" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Track Log/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("button", { name: "Alternar tema" }),
    ).toBeInTheDocument();
  });

  it("renders optional footer", () => {
    render(
      <AuthLayout
        title="Criar conta"
        description="Comece agora"
        footer={<a href="/login">Já tem conta?</a>}
      >
        <div>form</div>
      </AuthLayout>,
    );

    expect(screen.getByRole("link", { name: "Já tem conta?" })).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
