import { render, screen } from "@testing-library/react";
import { HomeHeaderActions } from "@/features/Home/container/HomeHeaderActions";

const useAuth = jest.fn();

jest.mock("@/components/providers/useAuthProvider", () => ({
  useAuth: () => useAuth(),
}));

jest.mock("@/features/Home/components/HeaderContent", () => ({
  HeaderContent: ({ name }: { name?: string | null }) => (
    <div data-testid="header-content">{name}</div>
  ),
}));

describe("HomeHeaderActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows guest links when unauthenticated", () => {
    useAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    render(<HomeHeaderActions />);

    expect(screen.getByRole("link", { name: "Entrar" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getByRole("link", { name: "Criar conta" })).toHaveAttribute(
      "href",
      "/cadastrar",
    );
  });

  it("shows header content when authenticated", () => {
    useAuth.mockReturnValue({
      user: { displayName: "Ana" },
      isLoading: false,
      isAuthenticated: true,
    });

    render(<HomeHeaderActions />);

    expect(screen.getByTestId("header-content")).toHaveTextContent("Ana");
  });
});
