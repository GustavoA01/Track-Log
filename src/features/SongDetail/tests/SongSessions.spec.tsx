import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SongSessions } from "../components/SongSessions";
import { sessions } from "./test-data";

jest.mock("../hooks/useDeleteSessionMutation", () => ({
  useDeleteSessionMutation: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
}));

jest.mock("../hooks/useClearSessionsMutation", () => ({
  useClearSessionsMutation: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
}));

describe("SongSessions", () => {
  it("renders sessions list and summary", () => {
    render(<SongSessions songId="song-1" sessions={sessions} />);

    expect(screen.getByText("Histórico de sessões")).toBeInTheDocument();
    expect(screen.getByText("2 sessões")).toBeInTheDocument();
    expect(screen.getByText("75 min")).toBeInTheDocument();
    expect(screen.getByText("Trabalhei acordes")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /limpar sessões/i }),
    ).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<SongSessions songId="song-1" sessions={[]} />);

    expect(
      screen.getByText(/inicie uma sessão de estudo/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /limpar sessões/i }),
    ).not.toBeInTheDocument();
  });

  it("opens clear sessions dialog", async () => {
    const user = userEvent.setup();

    render(<SongSessions songId="song-1" sessions={sessions} />);

    await user.click(screen.getByRole("button", { name: /limpar sessões/i }));

    expect(screen.getByText("Limpar sessões?")).toBeInTheDocument();
  });
});
