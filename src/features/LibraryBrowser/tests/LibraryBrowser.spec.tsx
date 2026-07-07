import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LibraryBrowser } from "../container/LibraryBrowser";
import { folders, sessionCounts, songs } from "./test-data";

jest.mock("../container/FolderCard", () => ({
  FolderCard: ({
    folder,
    isSelected,
    setSelectedFolderId,
  }: {
    folder: { id: string; name: string };
    isSelected: boolean;
    setSelectedFolderId: (id: string | null) => void;
  }) => (
    <button
      type="button"
      data-selected={isSelected}
      onClick={() => setSelectedFolderId(isSelected ? null : folder.id)}
    >
      {folder.name}
    </button>
  ),
}));

describe("LibraryBrowser", () => {
  it("renders search, folders and songs sections", () => {
    render(
      <LibraryBrowser
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
      />,
    );

    expect(
      screen.getByPlaceholderText("Buscar músicas, artistas ou pastas..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Pastas")).toBeInTheDocument();
    expect(screen.getByText("Músicas")).toBeInTheDocument();
    expect(screen.getAllByText("Wonderwall").length).toBeGreaterThan(0);
  });

  it("filters songs when searching", async () => {
    const user = userEvent.setup();

    render(
      <LibraryBrowser
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
      />,
    );

    await user.type(
      screen.getByPlaceholderText("Buscar músicas, artistas ou pastas..."),
      "black",
    );

    expect(screen.getAllByText("Black").length).toBeGreaterThan(0);
    expect(screen.queryByText("Wonderwall")).not.toBeInTheDocument();
    expect(screen.getByText("(1)")).toBeInTheDocument();
  });

  it("filters songs when selecting all music card", async () => {
    const user = userEvent.setup();

    render(
      <LibraryBrowser
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
      />,
    );

    const rockFolderCard = screen.getByRole("button", { name: "Rock" });

    await user.click(rockFolderCard);

    expect(screen.getAllByText("Wonderwall").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Café").length).toBeGreaterThan(0);
    expect(screen.queryByText("Black")).not.toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
  });
});
