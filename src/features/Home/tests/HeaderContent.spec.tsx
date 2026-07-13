jest.mock("@/features/FolderForm/container/FolderDialog", () => ({
  FolderDialog: () => <div data-testid="folder-dialog">Nova pasta</div>,
}));

jest.mock("@/features/Home/components/AccountContent", () => ({
  AccountContent: ({ name }: { name?: string | null }) => (
    <div data-testid="account-content">{name}</div>
  ),
}));

import { render, screen } from "@testing-library/react";
import { HeaderContent } from "@/features/Home/components/HeaderContent";

describe("HeaderContent", () => {
  it("renders folder dialog, new song link and account triggers", () => {
    render(<HeaderContent name="Ana" />);

    expect(screen.getByTestId("folder-dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Nova música/i })).toHaveAttribute(
      "href",
      "/musica/nova",
    );
    expect(
      screen.getAllByRole("button", { name: "Abrir menu da conta" }),
    ).toHaveLength(2);
    expect(screen.getAllByText("A").length).toBeGreaterThan(0);
  });
});
