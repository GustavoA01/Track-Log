import { render, screen } from "@testing-library/react";
import { AvatarButton } from "@/features/Home/components/AvatarButton";

describe("AvatarButton", () => {
  it("shows the first letter of the name", () => {
    render(<AvatarButton name="Ana" />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("shows a fallback when name is missing", () => {
    render(<AvatarButton name={null} />);

    expect(screen.getByText("?")).toBeInTheDocument();
  });
});
