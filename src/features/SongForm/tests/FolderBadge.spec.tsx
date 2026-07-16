import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FolderBadge } from "../components/FolderBadge";

describe("FolderBadge", () => {
  it("renders folder name and remove button", () => {
    const onRemoveFolder = jest.fn();

    render(
      <FolderBadge
        folder={{ name: "Rock", color: "#0d9488" }}
        onRemoveFolder={onRemoveFolder}
      />,
    );

    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remover da pasta Rock" }),
    ).toBeInTheDocument();
  });

  it("calls onRemoveFolder when remove button is clicked", async () => {
    const onRemoveFolder = jest.fn();
    const user = userEvent.setup();

    render(
      <FolderBadge
        folder={{ name: "Rock", color: "#0d9488" }}
        onRemoveFolder={onRemoveFolder}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remover da pasta Rock" }),
    );

    expect(onRemoveFolder).toHaveBeenCalledTimes(1);
  });
});
