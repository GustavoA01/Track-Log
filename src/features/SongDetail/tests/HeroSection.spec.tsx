import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeroSection } from "../container/HeroSection";
import { folder, song } from "./test-data";

jest.mock("../../StartSession/components/StartSessionTrigger", () => ({
  StartSessionTrigger: ({
    onStart,
  }: {
    onStart: (minutes: number) => void;
  }) => (
    <button type="button" onClick={() => onStart(25)}>
      Iniciar sessão de estudo
    </button>
  ),
}));

describe("HeroSection", () => {
  it("renders song info, folder badge and session stats", () => {
    render(
      <HeroSection
        song={song}
        folders={[folder]}
        sessionCount={2}
        totalMinutes={75}
        onStartSession={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Wonderwall" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Oasis")).toBeInTheDocument();
    expect(screen.getByText("Aprendendo")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(
      screen.getByText("2 sessões · 75 min praticados"),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Wonderwall" })).toBeInTheDocument();
  });

  it("renders multiple folder badges", () => {
    render(
      <HeroSection
        song={song}
        folders={[folder, { id: "folder-2", name: "Violão", color: "#2563eb" }]}
        sessionCount={2}
        totalMinutes={75}
        onStartSession={jest.fn()}
      />,
    );

    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Violão")).toBeInTheDocument();
  });

  it("uses singular session label", () => {
    render(
      <HeroSection
        song={song}
        sessionCount={1}
        totalMinutes={30}
        onStartSession={jest.fn()}
      />,
    );

    expect(
      screen.getByText("1 sessão · 30 min praticados"),
    ).toBeInTheDocument();
  });

  it("calls onStartSession from trigger", async () => {
    const onStartSession = jest.fn();
    const user = userEvent.setup();

    render(
      <HeroSection
        song={song}
        sessionCount={0}
        totalMinutes={0}
        onStartSession={onStartSession}
      />,
    );

    await user.click(screen.getByRole("button", { name: /iniciar sessão/i }));

    expect(onStartSession).toHaveBeenCalledWith(25);
  });
});
