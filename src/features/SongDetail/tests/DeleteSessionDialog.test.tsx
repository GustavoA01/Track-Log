import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteSessionDialog } from "../container/DeleteSessionDialog";
import { sessions } from "./test-data";

describe("DeleteSessionDialog", () => {
  it("renders nothing without session", () => {
    const { container } = render(
      <DeleteSessionDialog
        open
        session={null}
        isPending={false}
        onOpenChange={jest.fn()}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders session details and actions", async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const user = userEvent.setup();

    render(
      <DeleteSessionDialog
        open
        session={sessions[0]!}
        isPending={false}
        onOpenChange={jest.fn()}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    expect(screen.getByText("Excluir sessão?")).toBeInTheDocument();
    expect(screen.getByText(/01\/02\/2026/)).toBeInTheDocument();
    expect(screen.getByText(/30 min/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Excluir" }));
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("shows pending state", () => {
    render(
      <DeleteSessionDialog
        open
        session={sessions[0]!}
        isPending
        onOpenChange={jest.fn()}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Excluindo..." })).toBeDisabled();
  });
});
