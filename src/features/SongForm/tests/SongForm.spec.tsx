import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SongForm } from "../container/SongForm";
import { song, folders } from "./test-data";

const back = jest.fn();

jest.mock("../hooks/useCreateSongMutation", () => ({
  useCreateSongMutation: jest.fn(() => ({
    createSongFn: jest.fn(),
    isPending: false,
    goBack: back,
  })),
}));

jest.mock("../hooks/useUpdateSongMutation", () => ({
  useUpdateSongMutation: jest.fn(() => ({
    updateSongFn: jest.fn(),
    isPending: false,
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    back,
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

describe("SongForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create mode labels", () => {
    render(<SongForm />);

    expect(screen.getByText("Capa e recursos")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar música" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Anotações")).toBeInTheDocument();
  });

  it("renders edit mode submit label", () => {
    render(<SongForm song={song} />);

    expect(
      screen.getByRole("button", { name: "Salvar alterações" }),
    ).toBeInTheDocument();
  });

  it("renders folder fields when folders are provided", () => {
    render(<SongForm folders={folders} />);

    expect(screen.getByText("Pastas")).toBeInTheDocument();
    expect(screen.getByText("Selecione uma pasta")).toBeInTheDocument();
  });

  it("calls router.back on cancel", async () => {
    const user = userEvent.setup();

    render(<SongForm />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(back).toHaveBeenCalledTimes(1);
  });
});
