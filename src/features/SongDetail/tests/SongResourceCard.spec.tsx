import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayCircle } from "lucide-react";
import { SongResourceCard } from "../container/SongResourceCard";

const baseProps = {
  title: "Vídeo de referência",
  description: "Assista a uma performance ou aula para guiar seu estudo.",
  emptyLabel: "Nenhum vídeo adicionado ainda.",
  linkLabel: "Abrir vídeo",
  icon: PlayCircle,
  onSave: jest.fn(),
  onRemove: jest.fn(),
};

describe("SongResourceCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty state and saves url", async () => {
    const onSave = jest.fn();
    const user = userEvent.setup();

    render(<SongResourceCard {...baseProps} onSave={onSave} />);

    expect(
      screen.getByText("Nenhum vídeo adicionado ainda."),
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText("https://...");
    await user.type(input, "https://example.com/video");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(onSave).toHaveBeenCalledWith("https://example.com/video");
  });

  it("renders existing url with actions", async () => {
    const onRemove = jest.fn();
    const user = userEvent.setup();

    render(
      <SongResourceCard
        {...baseProps}
        url="https://example.com/video"
        embedUrl="https://www.youtube.com/embed/abc123"
        onRemove={onRemove}
      />,
    );

    expect(screen.getByTitle("Vídeo de referência")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/abc123",
    );
    expect(screen.getByRole("link", { name: /abrir vídeo/i })).toHaveAttribute(
      "href",
      "https://example.com/video",
    );

    await user.click(screen.getByRole("button", { name: /remover/i }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not save empty url", async () => {
    const onSave = jest.fn();
    const user = userEvent.setup();

    render(<SongResourceCard {...baseProps} onSave={onSave} />);

    expect(screen.getByRole("button", { name: /adicionar/i })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(onSave).not.toHaveBeenCalled();
  });
});
