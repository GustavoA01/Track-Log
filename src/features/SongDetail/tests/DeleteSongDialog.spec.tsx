import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteSongDialog } from "../container/DeleteSongDialog";

const mutateAsync = jest.fn();

jest.mock("../hooks/useDeleteSongMutation", () => ({
  useDeleteSongMutation: jest.fn(() => ({
    mutateAsync,
    isPending: false,
  })),
}));

import { useDeleteSongMutation } from "../hooks/useDeleteSongMutation";

const mockUseDeleteSongMutation = useDeleteSongMutation as jest.MockedFunction<
  typeof useDeleteSongMutation
>;

describe("DeleteSongDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mutateAsync.mockResolvedValue(undefined);
    mockUseDeleteSongMutation.mockReturnValue({
      mutateAsync,
      isPending: false,
    });
  });

  it("renders song title in confirmation message", () => {
    render(
      <DeleteSongDialog
        open
        songId="song-1"
        songTitle="Wonderwall"
        onOpenChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Excluir música?")).toBeInTheDocument();
    expect(screen.getByText(/Wonderwall/)).toBeInTheDocument();
  });

  it("confirms deletion", async () => {
    const onOpenChange = jest.fn();
    const user = userEvent.setup();

    render(
      <DeleteSongDialog
        open
        songId="song-1"
        songTitle="Wonderwall"
        onOpenChange={onOpenChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Excluir" }));

    expect(mutateAsync).toHaveBeenCalledWith("song-1");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("shows pending state", () => {
    mockUseDeleteSongMutation.mockReturnValue({
      mutateAsync,
      isPending: true,
    });

    render(
      <DeleteSongDialog
        open
        songId="song-1"
        songTitle="Wonderwall"
        onOpenChange={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Excluindo..." })).toBeDisabled();
  });
});
