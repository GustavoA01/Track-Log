import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/BackButton";

const mockUseRouter = useRouter as jest.Mock;

describe("BackButton", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it("renders back button", () => {
    render(<BackButton />);

    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
  });

  it("calls router.back on click", async () => {
    const back = jest.fn();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back,
      forward: jest.fn(),
      prefetch: jest.fn(),
    });

    const user = userEvent.setup();
    render(<BackButton />);

    await user.click(screen.getByRole("button", { name: /voltar/i }));

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("renders a link when href is provided", () => {
    render(<BackButton href="/" />);

    const link = screen.getByRole("link", { name: /voltar/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies extra className", () => {
    render(<BackButton className="custom-class" />);

    expect(screen.getByRole("button", { name: /voltar/i })).toHaveClass(
      "custom-class",
    );
  });
});
