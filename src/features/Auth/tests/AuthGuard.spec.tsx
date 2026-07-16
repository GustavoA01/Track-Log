const useAuth = jest.fn();
const replace = jest.fn();

jest.mock("@/components/providers/useAuthProvider", () => ({
  useAuth: () => useAuth(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/historico",
}));

import { render, screen } from "@testing-library/react";
import { AuthGuard } from "../container/AuthGuard";

describe("AuthGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading while auth is resolving", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    const { container } = render(
      <AuthGuard mode="protected">
        <p>Conteúdo</p>
      </AuthGuard>,
    );

    expect(screen.queryByText("Conteúdo")).not.toBeInTheDocument();
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
      0,
    );
  });

  it("renders children when protected and authenticated", () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <AuthGuard mode="protected">
        <p>Conteúdo protegido</p>
      </AuthGuard>,
    );

    expect(screen.getByText("Conteúdo protegido")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("redirects unauthenticated users to login with next", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <AuthGuard mode="protected">
        <p>Conteúdo</p>
      </AuthGuard>,
    );

    expect(screen.queryByText("Conteúdo")).not.toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith("/login?next=%2Fhistorico");
  });

  it("renders children when guest and unauthenticated", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <AuthGuard mode="guest">
        <p>Formulário de login</p>
      </AuthGuard>,
    );

    expect(screen.getByText("Formulário de login")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("redirects authenticated guests to home", () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <AuthGuard mode="guest">
        <p>Formulário de login</p>
      </AuthGuard>,
    );

    expect(screen.queryByText("Formulário de login")).not.toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith("/");
  });
});
