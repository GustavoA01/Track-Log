import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FolderCardMenuTrigger } from "../components/FolderCardMenuTrigger";

describe("FolderCardMenuTrigger", () => {
  it("renders options button", () => {
    render(<FolderCardMenuTrigger />);

    expect(
      screen.getByRole("button", { name: "Opções da pasta" }),
    ).toBeInTheDocument();
  });

  it("calls onClick without bubbling", async () => {
    const onClick = jest.fn();
    const parentClick = jest.fn();
    const user = userEvent.setup();

    render(
      <div onClick={parentClick}>
        <FolderCardMenuTrigger onClick={onClick} />
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Opções da pasta" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(parentClick).not.toHaveBeenCalled();
  });
});
