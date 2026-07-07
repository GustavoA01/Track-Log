jest.mock("../../features/FolderForm/container/FolderDialog", () => ({
  FolderDialog: () => <div data-testid="folder-dialog">Nova pasta</div>,
}));

import { render, screen } from "@testing-library/react";
import { HomeHeader } from "@/components/HomeHeader";

describe("HomeHeader", () => {
  it("renders logo, navigation and main actions", () => {
    render(<HomeHeader />);

    expect(screen.getByText("Track Log")).toBeInTheDocument();
    expect(screen.getByText("Seu diário de estudos")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Track Log/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Nova música/i })).toHaveAttribute(
      "href",
      "/musica/nova",
    );
    expect(screen.getByTestId("folder-dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Alternar tema" }),
    ).toBeInTheDocument();
  });
});
