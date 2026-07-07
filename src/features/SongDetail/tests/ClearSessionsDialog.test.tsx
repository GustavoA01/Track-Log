import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClearSessionsDialog } from "../container/ClearSessionsDialog";

const mutateAsync = jest.fn();

jest.mock("../hooks/useClearSessionsMutation", () => ({
  useClearSessionsMutation: jest.fn(() => ({
    mutateAsync,
    isPending: false,
  })),
}));

import { useClearSessionsMutation } from "../hooks/useClearSessionsMutation";

const mockUseClearSessionsMutation =
  useClearSessionsMutation as jest.MockedFunction<
    typeof useClearSessionsMutation
  >;

describe("ClearSessionsDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mutateAsync.mockResolvedValue(undefined);
    mockUseClearSessionsMutation.mockReturnValue({
      mutateAsync,
      isPending: false,
    });
  });

  it("renders session count in confirmation message", () => {
    render(
      <ClearSessionsDialog
        open
        songId="song-1"
        sessionCount={2}
        onOpenChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Limpar sessões?")).toBeInTheDocument();
    expect(screen.getByText(/todas as 2 sessões/i)).toBeInTheDocument();
  });

  it("uses singular label for one session", () => {
    render(
      <ClearSessionsDialog
        open
        songId="song-1"
        sessionCount={1}
        onOpenChange={jest.fn()}
      />,
    );

    expect(screen.getByText(/todas as 1 sessão/i)).toBeInTheDocument();
  });

  it("confirms clearing sessions", async () => {
    const onOpenChange = jest.fn();
    const user = userEvent.setup();

    render(
      <ClearSessionsDialog
        open
        songId="song-1"
        sessionCount={2}
        onOpenChange={onOpenChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Limpar sessões" }));

    expect(mutateAsync).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
