import { render, screen } from "@testing-library/react";
import { HistoricalDescription } from "../components/HistoricalDescription";

describe("HistoricalDescription", () => {
  it("renders empty state", () => {
    render(<HistoricalDescription totalSessions={0} totalTime={0} />);

    expect(
      screen.getByText("Nenhuma sessão registrada ainda"),
    ).toBeInTheDocument();
  });

  it("renders plural session summary", () => {
    render(<HistoricalDescription totalSessions={2} totalTime={75} />);

    expect(screen.getByText("2 sessões")).toBeInTheDocument();
    expect(screen.getByText("75 min")).toBeInTheDocument();
  });

  it("renders singular session summary", () => {
    render(<HistoricalDescription totalSessions={1} totalTime={30} />);

    expect(screen.getByText("1 sessão")).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
  });
});
