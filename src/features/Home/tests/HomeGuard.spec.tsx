import { render, screen } from "@testing-library/react";
import { HomeGuard } from "@/features/Home/container/HomeGuard";

const useAuth = jest.fn();

jest.mock("@/components/providers/useAuthProvider", () => ({
  useAuth: () => useAuth(),
}));

describe("HomeGuard", () => {
  it("shows loading while auth is resolving", () => {
    useAuth.mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
    });

    render(
      <HomeGuard isServerAuthenticated={false}>
        <div>guest</div>
      </HomeGuard>,
    );

    expect(screen.getByRole("main")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("guest")).not.toBeInTheDocument();
  });

  it("shows loading when client is authenticated but server is not", () => {
    useAuth.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    });

    render(
      <HomeGuard isServerAuthenticated={false}>
        <div>guest</div>
      </HomeGuard>,
    );

    expect(screen.getByRole("main")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("guest")).not.toBeInTheDocument();
  });

  it("renders children when auth is settled", () => {
    useAuth.mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
    });

    render(
      <HomeGuard isServerAuthenticated={false}>
        <div>guest</div>
      </HomeGuard>,
    );

    expect(screen.getByText("guest")).toBeInTheDocument();
  });
});
