import { render, screen } from "@testing-library/react";
import { Dialog } from "@/components/ui/dialog";
import { NewFolderTrigger } from "../components/NewFolderTrigger";

describe("NewFolderTrigger", () => {
  it("renders the new folder trigger button", () => {
    render(
      <Dialog>
        <NewFolderTrigger />
      </Dialog>,
    );

    expect(
      screen.getByRole("button", { name: /nova pasta/i }),
    ).toBeInTheDocument();
  });

  it("keeps the label accessible while hiding text on small screens", () => {
    render(
      <Dialog>
        <NewFolderTrigger />
      </Dialog>,
    );

    const label = screen.getByText("Nova pasta");
    expect(label).toHaveClass("max-sm:sr-only");
  });
});
