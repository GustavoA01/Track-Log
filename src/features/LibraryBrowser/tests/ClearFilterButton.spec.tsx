import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClearFilterButton } from "../components/ClearFilterButton";

describe("ClearFilterButton", () => {
  it("renders section title without clear button when no folder is selected", () => {
    render(
      <ClearFilterButton
        selectedFolderId={null}
        setSelectedFolderId={jest.fn()}
      />,
    );

    expect(screen.getByText("Pastas")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Limpar filtro" }),
    ).not.toBeInTheDocument();
  });

  it("shows clear filter button when a folder is selected", async () => {
    const setSelectedFolderId = jest.fn();
    const user = userEvent.setup();

    render(
      <ClearFilterButton
        selectedFolderId="folder-1"
        setSelectedFolderId={setSelectedFolderId}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Limpar filtro" }));

    expect(setSelectedFolderId).toHaveBeenCalledWith(null);
  });
});
