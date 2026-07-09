import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
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

  useEffect(() => {
    dialog.openDialog(sessions[0]!);
  }, []);

  if (!dialog.open) return null;

  return <EditSessionDialog dialog={dialog} />;
}

describe("EditSessionDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mutateAsync.mockResolvedValue(undefined);
  });

  it("renders edit form with locked date field", () => {
    render(<EditSessionDialogHarness />);

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
