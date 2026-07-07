import { render, screen } from "@testing-library/react";
import { MusicsSection } from "../components/MusicsSection";
import { folders, sessionCounts, songs } from "./test-data";

describe("MusicsSection", () => {
  it("renders songs count in header", () => {
    render(
      <MusicsSection
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
      />,
    );

    expect(screen.getByText("Músicas")).toBeInTheDocument();
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it("renders song items when songs exist", () => {
    render(
      <MusicsSection
        folders={folders}
        songs={songs}
        sessionCounts={sessionCounts}
      />,
    );

    expect(screen.getAllByText("Wonderwall").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Black").length).toBeGreaterThan(0);
  });

  it("renders empty state when there are no songs", () => {
    render(<MusicsSection folders={folders} songs={[]} sessionCounts={{}} />);

    expect(screen.getByText("Nenhuma música encontrada")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });
});
