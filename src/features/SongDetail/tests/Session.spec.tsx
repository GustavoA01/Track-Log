import { render, screen } from "@testing-library/react";
import { Session } from "../components/Session";
import { sessions } from "./test-data";

describe("Session", () => {
  it("renders session date, notes and duration", () => {
    render(
      <Session
        session={sessions[0]!}
        index={0}
        sessions={sessions}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    expect(screen.getByText("01/02/2026")).toBeInTheDocument();
    expect(screen.getByText("Trabalhei acordes")).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
  });

  it("hides notes when empty", () => {
    render(
      <Session
        session={sessions[1]!}
        index={1}
        sessions={sessions}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    expect(screen.getByText("45 min")).toBeInTheDocument();
    expect(screen.queryByText("Trabalhei acordes")).not.toBeInTheDocument();
  });
});
