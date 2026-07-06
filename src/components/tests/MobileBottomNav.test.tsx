import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { MobileBottomNav } from "@/components/MobileBottomNav";

const mockUsePathname = usePathname as jest.Mock;

describe("MobileBottomNav", () => {
  it("renders mobile navigation tabs", () => {
    mockUsePathname.mockReturnValue("/");

    render(<MobileBottomNav />);

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

    render(<MobileBottomNav />);

    expect(screen.getByRole("link", { name: "Histórico" })).toHaveClass(
      "text-primary",
    );
    expect(screen.getByRole("link", { name: "Início" })).toHaveClass(
      "text-muted-foreground",
    );
  });
});
