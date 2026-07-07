import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActiveSessionBar } from "../components/ActiveSessionBar";

describe("ActiveSessionBar", () => {
  it("renders remaining time, title and progress", () => {
    render(
      <ActiveSessionBar
        title="Wonderwall"
        remainingTime="12:30"
        progress={58}
      />,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("12:30")).toBeInTheDocument();
    expect(screen.getByText("Wonderwall")).toBeInTheDocument();
  });

  it("shows pause label when playing", () => {
    render(
      <ActiveSessionBar
        title="Wonderwall"
        remainingTime="12:30"
        progress={58}
        isPaused={false}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Pausar sessão" }),
    ).toBeInTheDocument();
  });

  it("shows resume label when paused", () => {
    render(
      <ActiveSessionBar
        title="Wonderwall"
        remainingTime="12:30"
        progress={58}
        isPaused
      />,
    );

    expect(
      screen.getByRole("button", { name: "Retomar sessão" }),
    ).toBeInTheDocument();
  });

  it("calls pause and stop handlers", async () => {
    const onTogglePause = jest.fn();
    const onStop = jest.fn();
    const user = userEvent.setup();

    render(
      <ActiveSessionBar
        title="Wonderwall"
        remainingTime="12:30"
        progress={58}
        onTogglePause={onTogglePause}
        onStop={onStop}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Pausar sessão" }));
    await user.click(screen.getByRole("button", { name: "Parar sessão" }));

    expect(onTogglePause).toHaveBeenCalledTimes(1);
    expect(onStop).toHaveBeenCalledTimes(1);
  });
});
