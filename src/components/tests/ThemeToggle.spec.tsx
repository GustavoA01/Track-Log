import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "@wrksz/themes/client";
import { ThemeToggle } from "@/components/ThemeToggle";

const mockUseTheme = useTheme as jest.Mock;

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      setTheme: jest.fn(),
      resolvedTheme: "light",
      theme: "light",
    });
  });

  it("renders theme toggle button", async () => {
    render(<ThemeToggle />);

    expect(
      await screen.findByRole("button", { name: "Alternar tema" }),
    ).toBeInTheDocument();
  });

  it("switches to dark when current theme is light", async () => {
    const setTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      setTheme,
      resolvedTheme: "light",
      theme: "light",
    });

    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(
      await screen.findByRole("button", { name: "Alternar tema" }),
    );

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("switches to light when current theme is dark", async () => {
    const setTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      setTheme,
      resolvedTheme: "dark",
      theme: "dark",
    });

    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(
      await screen.findByRole("button", { name: "Alternar tema" }),
    );

    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
