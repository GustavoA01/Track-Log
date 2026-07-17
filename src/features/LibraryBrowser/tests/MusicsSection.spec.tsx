import { render, screen } from "@testing-library/react";
import { MusicsSection } from "../components/MusicsSection";
import { folders, sessionCounts, songs } from "./test-data";

const sortProps = {
  reverseSongs: false,
  setReverseSongs: jest.fn(),
  sortBy: "createdAt" as const,
  setSortBy: jest.fn(),
};

describe("MusicsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders songs count in header", () => {
    render(
      <MusicsSection
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
        {...sortProps}
      />,
    );

    expect(screen.getByText("Músicas")).toBeInTheDocument();
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it("renders song items when songs exist", () => {
    render(
      <MusicsSection
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
        {...sortProps}
      />,
    );

    expect(screen.getAllByText("Wonderwall").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Black").length).toBeGreaterThan(0);
  });

  it("renders empty state when there are no songs", () => {
    render(
      <MusicsSection
        folders={folders}
        songs={[]}
        sessionCounts={{}}
        {...sortProps}
      />,
    );

    expect(screen.getByText("Nenhuma música encontrada")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  it("renders create link when a folder is selected", () => {
    render(
      <MusicsSection
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
        selectedFolderId="folder-1"
        {...sortProps}
      />,
    );

    const link = screen.getByRole("link", { name: /nova música em rock/i });
    expect(link).toHaveAttribute("href", "/musica/nova?folderId=folder-1");
  });

  it("does not render create link without selected folder", () => {
    render(
      <MusicsSection
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
        {...sortProps}
      />,
    );

    expect(
      screen.queryByRole("link", { name: /nova música em/i }),
    ).not.toBeInTheDocument();
  });
});
