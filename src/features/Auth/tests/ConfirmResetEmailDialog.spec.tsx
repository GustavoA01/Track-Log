import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmResetEmailDialog } from "../components/ConfirmResetEmailDialog";

describe("ConfirmResetEmailDialog", () => {
  const onOpenChange = jest.fn();
  const onConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the email and confirms send", async () => {
    const user = userEvent.setup();

    render(
      <ConfirmResetEmailDialog
        open
        email="ana@email.com"
        isPending={false}
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /enviar e-mail de redefinição/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("ana@email.com")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /enviar e-mail/i }));

    expect(onConfirm).toHaveBeenCalled();
  });

  it("cancels without confirming", async () => {
    const user = userEvent.setup();

    render(
      <ConfirmResetEmailDialog
        open
        email="ana@email.com"
        isPending={false}
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("disables actions while pending", () => {
    render(
      <ConfirmResetEmailDialog
        open
        email="ana@email.com"
        isPending
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeDisabled();
  });
});
