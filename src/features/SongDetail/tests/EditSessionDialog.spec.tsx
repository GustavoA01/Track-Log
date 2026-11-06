import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditSessionDialog } from "../container/EditSessionDialog";
import { useEditSessionDialog } from "../hooks/useEditSessionDialog";
import { sessions } from "./test-data";

const mutateAsync = jest.fn();

jest.mock("../hooks/useUpdateSessionMutation", () => ({
  useUpdateSessionMutation: jest.fn(
    (_songId: string, options?: { onSuccess?: () => void }) => ({
      mutateAsync: async (...args: unknown[]) => {
        const result = await mutateAsync(...args);
        options?.onSuccess?.();
        return result;
      },
      isPending: false,
    }),
  ),
}));

function EditSessionDialogHarness() {
  const dialog = useEditSessionDialog("song-1");

  return (
    <>
      <button type="button" onClick={() => dialog.openDialog(sessions[0]!)}>
        Abrir edição
      </button>
      <EditSessionDialog dialog={dialog} />
    </>
  );
}

describe("EditSessionDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mutateAsync.mockResolvedValue(undefined);
  });

  it("renders edit form with locked date field", async () => {
    const user = userEvent.setup();
    render(<EditSessionDialogHarness />);

    await user.click(screen.getByRole("button", { name: "Abrir edição" }));

    expect(screen.getByText("Editar sessão")).toBeInTheDocument();
    expect(screen.getByLabelText("Data")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Desbloquear data" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Salvar alterações" }),
    ).toBeInTheDocument();
  });
});
