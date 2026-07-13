jest.mock("@/features/Home/container/LogoutButton", () => ({
  LogoutButton: () => <button type="button">Sair</button>,
}));

import { render, screen } from "@testing-library/react";
import { AccountContent } from "@/features/Home/components/AccountContent";

describe("AccountContent", () => {
  it("renders account name, edit link and logout", () => {
    render(<AccountContent name="Ana" />);

    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Alterar dados" })).toHaveAttribute(
      "href",
      "/cadastrar?edit=true",
    );
    expect(screen.getByRole("button", { name: "Sair" })).toBeInTheDocument();
  });
});
