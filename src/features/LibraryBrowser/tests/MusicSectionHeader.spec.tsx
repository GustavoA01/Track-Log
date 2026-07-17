import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MusicSectionHeader } from "../components/MusicSectionHeader";

const baseProps = {
  songsLength: 3,
  selectedFolderId: null,
  selectedFolderName: "",
  sortBy: "createdAt" as const,
  setSortBy: jest.fn(),
  reverseSongs: false,
  setReverseSongs: jest.fn(),
};

describe("MusicSectionHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the songs count", () => {
    render(<MusicSectionHeader {...baseProps} />);

    expect(screen.getByText("Músicas")).toBeInTheDocument();
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it("shows current sort label", () => {
    render(<MusicSectionHeader {...baseProps} sortBy="difficulty" />);

    expect(screen.getByText("Dificuldade")).toBeInTheDocument();
  });

  it("renders create link when a folder is selected", () => {
    render(
      <MusicSectionHeader
        {...baseProps}
        selectedFolderId="folder-1"
        selectedFolderName="Rock"
      />,
    );

    const link = screen.getByRole("link", { name: /nova música em rock/i });
    expect(link).toHaveAttribute("href", "/musica/nova?folderId=folder-1");
  });

  it("does not render create link without a selected folder", () => {
    render(<MusicSectionHeader {...baseProps} />);

    expect(
      screen.queryByRole("link", { name: /nova música em/i }),
    ).not.toBeInTheDocument();
  });

  it("toggles reverse order on button click", async () => {
    const setReverseSongs = jest.fn();
    const user = userEvent.setup();

    render(
      <MusicSectionHeader {...baseProps} setReverseSongs={setReverseSongs} />,
    );

    await user.click(screen.getByRole("button", { name: /inverter ordem/i }));

    expect(setReverseSongs).toHaveBeenCalledWith(true);
  });
});
