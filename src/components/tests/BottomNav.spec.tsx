import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";

const mockUsePathname = usePathname as jest.Mock;

describe("BottomNav", () => {
  it("renders mobile navigation tabs", () => {
    mockUsePathname.mockReturnValue("/");

    render(<BottomNav />);

    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Histórico" })).toHaveAttribute(
      "href",
      "/historico",
    );
  });

  it("hides on auth routes", () => {
    mockUsePathname.mockReturnValue("/login");

    const { container } = render(<BottomNav />);

    expect(container).toBeEmptyDOMElement();
  });
});
