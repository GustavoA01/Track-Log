import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SongFoldersSection } from "../container/SongFoldersSection";
import { folders } from "./test-data";

const addToFolder = jest.fn();
const removeFromFolder = jest.fn();

jest.mock("../hooks/useSongFolderMutations", () => ({
  useAddSongToFolderMutation: () => ({
    mutateAsync: addToFolder,
    isPending: false,
  }),
  useRemoveSongFromFolderMutation: () => ({
    mutateAsync: removeFromFolder,
    isPending: false,
  }),
}));

describe("SongFoldersSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    addToFolder.mockResolvedValue({ folderIds: ["folder-1", "folder-2"] });
    removeFromFolder.mockResolvedValue({ folderIds: [] });
  });

  it("renders empty state when song has no folders", () => {
    render(
      <SongFoldersSection
        songId="song-1"
        folders={folders}
        songFolderIds={[]}
        onFolderIdsChange={jest.fn()}
      />,
    );

    expect(
      screen.getByText("Esta música ainda não está em nenhuma pasta."),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Adicionar à pasta" }),
    ).toBeDisabled();
  });

  it("renders assigned folders with remove buttons", () => {
    render(
      <SongFoldersSection
        songId="song-1"
        folders={folders}
        songFolderIds={["folder-1"]}
        onFolderIdsChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remover da pasta Rock" }),
    ).toBeInTheDocument();
  });

  it("adds song to folder and notifies parent", async () => {
    const onFolderIdsChange = jest.fn();
    const user = userEvent.setup();

    render(
      <SongFoldersSection
        songId="song-1"
        folders={folders}
        songFolderIds={[]}
        onFolderIdsChange={onFolderIdsChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Rock" }));
    await user.click(screen.getByRole("button", { name: "Adicionar à pasta" }));

    expect(addToFolder).toHaveBeenCalledWith("folder-1");
    expect(onFolderIdsChange).toHaveBeenCalledWith(["folder-1", "folder-2"]);
  });

  it("removes song from folder and notifies parent", async () => {
    const onFolderIdsChange = jest.fn();
    const user = userEvent.setup();

    render(
      <SongFoldersSection
        songId="song-1"
        folders={folders}
        songFolderIds={["folder-1"]}
        onFolderIdsChange={onFolderIdsChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remover da pasta Rock" }),
    );

    expect(removeFromFolder).toHaveBeenCalledWith("folder-1");
    expect(onFolderIdsChange).toHaveBeenCalledWith([]);
  });

  it("hides add controls when song is in all folders", () => {
    render(
      <SongFoldersSection
        songId="song-1"
        folders={folders}
        songFolderIds={["folder-1", "folder-2"]}
        onFolderIdsChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Violão")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Adicionar à pasta" }),
    ).not.toBeInTheDocument();
  });
});
