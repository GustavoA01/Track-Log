import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogoutButton } from "@/features/Home/container/LogoutButton";

const replace = jest.fn();
const refresh = jest.fn();
const toastSuccess = jest.fn();
const toastError = jest.fn();
const logout = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace, refresh }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
  },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  logout: (...args: unknown[]) => logout(...args),
  getFirebaseAuthErrorMessage: () => "Falha ao sair",
}));

describe("LogoutButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("logs out and redirects to login", async () => {
    const user = userEvent.setup();
    logout.mockResolvedValue(undefined);

    render(<LogoutButton />);
    await user.click(screen.getByRole("button", { name: "Sair" }));

    expect(logout).toHaveBeenCalled();
    expect(toastSuccess).toHaveBeenCalledWith("Você saiu da conta");
    expect(replace).toHaveBeenCalledWith("/login");
    expect(refresh).toHaveBeenCalled();
  });

  it("shows error toast when logout fails", async () => {
    const user = userEvent.setup();
    logout.mockRejectedValue(new Error("fail"));

    render(<LogoutButton />);
    await user.click(screen.getByRole("button", { name: "Sair" }));

    expect(toastError).toHaveBeenCalledWith("Falha ao sair");
    expect(replace).not.toHaveBeenCalled();
  });
});
