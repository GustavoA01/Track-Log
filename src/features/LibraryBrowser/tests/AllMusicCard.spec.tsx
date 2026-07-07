import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AllMusicCard } from "../components/AllMusicCard";
import { songs } from "./test-data";

describe("AllMusicCard", () => {
  it("renders total song count and labels", () => {
    render(
      <AllMusicCard
        songs={songs}
        selectedFolderId="folder-1"
        setSelectedFolderId={jest.fn()}
      />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Todas")).toBeInTheDocument();
    expect(screen.getByText("Biblioteca")).toBeInTheDocument();
  });

  it("clears folder filter when clicked", async () => {
    const setSelectedFolderId = jest.fn();
    const user = userEvent.setup();

    render(
      <AllMusicCard
        songs={songs}
        selectedFolderId="folder-1"
        setSelectedFolderId={setSelectedFolderId}
      />,
    );

    await user.click(screen.getByRole("button"));

    expect(setSelectedFolderId).toHaveBeenCalledWith(null);
  });

  it("highlights card when no folder is selected", () => {
    const { container } = render(
      <AllMusicCard
        songs={songs}
        selectedFolderId={null}
        setSelectedFolderId={jest.fn()}
      />,
    );

    expect(container.firstChild).toHaveClass("border-primary");
  });
});
