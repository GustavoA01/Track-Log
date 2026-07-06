import { render, screen } from "@testing-library/react";
import { SongStatusBadge } from "@/components/SongStatusBadge";

describe("SongStatusBadge", () => {
  it.each([
    ["learning", "Aprendendo"],
    ["want_to_learn", "Quero aprender"],
    ["learned", "Aprendida"],
    ["paused", "Pausada"],
  ] as const)("renders the correct label for status %s", (status, label) => {
    render(<SongStatusBadge status={status} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("applies extra className", () => {
    render(<SongStatusBadge status="learning" className="custom-class" />);

    expect(screen.getByText("Aprendendo")).toHaveClass("custom-class");
  });
});
