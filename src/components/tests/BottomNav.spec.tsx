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

  it("applies active style to the matching tab", () => {
    mockUsePathname.mockReturnValue("/historico");

    render(<BottomNav />);

    expect(screen.getByRole("link", { name: "Histórico" })).toHaveClass(
      "text-primary",
    );
    expect(screen.getByRole("link", { name: "Início" })).toHaveClass(
      "text-muted-foreground",
    );
  });

  it("hides on auth routes", () => {
    mockUsePathname.mockReturnValue("/login");

    const { container } = render(<BottomNav />);

    expect(container).toBeEmptyDOMElement();
  });
});
