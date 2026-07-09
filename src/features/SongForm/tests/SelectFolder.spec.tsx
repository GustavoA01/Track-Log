import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectFolder } from "../components/SelectFolder";
import { folders } from "./test-data";

describe("SelectFolder", () => {
  it("renders select and disabled add button by default", () => {
    render(
      <SelectFolder
        selectedFolderId=""
        setSelectedFolderId={jest.fn()}
        availableFolders={folders}
        handleAddFolder={jest.fn()}
      />,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adicionar" })).toBeDisabled();
  });

  it("lists available folders and calls handleAddFolder", async () => {
    const setSelectedFolderId = jest.fn();
    const handleAddFolder = jest.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <SelectFolder
        selectedFolderId=""
        setSelectedFolderId={setSelectedFolderId}
        availableFolders={folders}
        handleAddFolder={handleAddFolder}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Rock" }));

    expect(setSelectedFolderId).toHaveBeenCalledWith("folder-1");

    rerender(
      <SelectFolder
        selectedFolderId="folder-1"
        setSelectedFolderId={setSelectedFolderId}
        availableFolders={folders}
        handleAddFolder={handleAddFolder}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Adicionar" }));

    expect(handleAddFolder).toHaveBeenCalledTimes(1);
  });
});
