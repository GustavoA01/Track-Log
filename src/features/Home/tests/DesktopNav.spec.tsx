import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { DesktopNav } from "@/features/Home/container/DesktopNav";

const mockUsePathname = usePathname as jest.Mock;

describe("DesktopNav", () => {
  it("renders navigation links", () => {
    mockUsePathname.mockReturnValue("/");

    render(<DesktopNav />);

    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Histórico" })).toHaveAttribute(
      "href",
      "/historico",
    );
  });

  it("highlights the active link based on pathname", () => {
    mockUsePathname.mockReturnValue("/historico");

    render(<DesktopNav />);

    expect(screen.getByRole("link", { name: "Histórico" })).toHaveClass(
      "bg-secondary",
    );
  });
});
