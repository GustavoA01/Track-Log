import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { SongHeader } from "../components/SongHeader";

const mockUseRouter = useRouter as jest.Mock;

describe("SongHeader", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it("renders back button and action buttons", () => {
    render(
      <SongHeader
        songId="song-1"
        backHref="/biblioteca"
        onDelete={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /voltar/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /editar/i })).toHaveAttribute(
      "href",
      "/musica/nova/?songId=song-1",
    );
    expect(
      screen.getByRole("button", { name: /excluir/i }),
    ).toBeInTheDocument();
  });

  it("navigates back using backHref", async () => {
    const push = jest.fn();
    mockUseRouter.mockReturnValue({
      push,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    });

    const user = userEvent.setup();

    render(
      <SongHeader
        songId="song-1"
        backHref="/biblioteca"
        onDelete={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /voltar/i }));

    expect(push).toHaveBeenCalledWith("/biblioteca");
  });

  it("calls onDelete when delete is clicked", async () => {
    const onDelete = jest.fn();
    const user = userEvent.setup();

    render(
      <SongHeader songId="song-1" backHref="/biblioteca" onDelete={onDelete} />,
    );

    await user.click(screen.getByRole("button", { name: /excluir/i }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
