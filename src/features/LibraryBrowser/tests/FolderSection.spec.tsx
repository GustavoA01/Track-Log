import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FolderSection } from "../container/FolderSection";
import { folders, songs } from "./test-data";

jest.mock("../container/FolderCard", () => ({
  FolderCard: ({
    folder,
    count,
    isSelected,
  }: {
    folder: { id: string; name: string };
    count: number;
    isSelected: boolean;
  }) => (
    <div data-testid={`folder-card-${folder.id}`} data-selected={isSelected}>
      {folder.name} ({count})
    </div>
  ),
}));

describe("FolderSection", () => {
  it("renders all music card and folder cards with counts", () => {
    render(
      <FolderSection
        folders={folders}
        songs={songs}
        selectedFolderId={null}
        setSelectedFolderId={jest.fn()}
      />,
    );

    expect(screen.getByText("Todas")).toBeInTheDocument();
    expect(screen.getByTestId("folder-card-folder-1")).toHaveTextContent(
      "Rock (2)",
    );
    expect(screen.getByTestId("folder-card-folder-2")).toHaveTextContent(
      "Violão (2)",
    );
  });

  it("marks selected folder card", () => {
    render(
      <FolderSection
        folders={folders}
        songs={songs}
        selectedFolderId="folder-2"
        setSelectedFolderId={jest.fn()}
      />,
    );

    expect(screen.getByTestId("folder-card-folder-2")).toHaveAttribute(
      "data-selected",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Limpar filtro" }),
    ).toBeInTheDocument();
  });

  it("clears filter from header button", async () => {
    const setSelectedFolderId = jest.fn();
    const user = userEvent.setup();

    render(
      <FolderSection
        folders={folders}
        songs={songs}
        selectedFolderId="folder-1"
        setSelectedFolderId={setSelectedFolderId}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Limpar filtro" }));

    expect(setSelectedFolderId).toHaveBeenCalledWith(null);
  });
});
