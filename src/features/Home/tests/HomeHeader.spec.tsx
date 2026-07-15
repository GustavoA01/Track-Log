import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeHeader } from "@/features/Home/container/HomeHeader";

jest.mock("@/features/FolderForm/container/FolderDialog", () => ({
  FolderDialog: () => <div data-testid="folder-dialog">Nova pasta</div>,
}));

jest.mock("@/features/Home/container/LogoutButton", () => ({
  LogoutButton: () => <button type="button">Sair</button>,
}));

const useAuth = jest.fn();

jest.mock("@/components/providers/useAuthProvider", () => ({
  useAuth: () => useAuth(),
}));

describe("HomeHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo, navigation and main actions when authenticated", async () => {
    const user = userEvent.setup();
    useAuth.mockReturnValue({
      user: { uid: "uid-1", displayName: "Ana" },
      isLoading: false,
      isAuthenticated: true,
    });

    render(<HomeHeader />);

    expect(screen.getByText("Track Log")).toBeInTheDocument();
    expect(screen.getByText("Seu diário de estudos")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Track Log/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Nova música/i })).toHaveAttribute(
      "href",
      "/musica/nova",
    );
    expect(screen.getByTestId("folder-dialog")).toBeInTheDocument();
    expect(screen.getAllByText("A").length).toBeGreaterThan(0);

    const accountTriggers = screen.getAllByRole("button", {
      name: "Abrir menu da conta",
    });
    await user.click(accountTriggers[0]!);
    expect(
      await screen.findByRole("button", { name: "Sair" }),
    ).toBeInTheDocument();
  });

  it("renders guest auth links when unauthenticated", () => {
    useAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    render(<HomeHeader />);

    expect(screen.getByRole("link", { name: "Entrar" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getByRole("link", { name: "Criar conta" })).toHaveAttribute(
      "href",
      "/cadastrar",
    );
    expect(screen.queryByTestId("folder-dialog")).not.toBeInTheDocument();
  });
});
