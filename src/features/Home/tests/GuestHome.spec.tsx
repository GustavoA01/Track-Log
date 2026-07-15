import { render, screen } from "@testing-library/react";
import { GuestHome } from "@/features/Home/components/GuestHome";

describe("GuestHome", () => {
  it("renders guest landing content and auth links", () => {
    render(<GuestHome />);

    expect(
      screen.getByRole("heading", { name: /diário de estudos musicais/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Entrar" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getByRole("link", { name: "Criar conta" })).toHaveAttribute(
      "href",
      "/cadastrar",
    );
  });
});
