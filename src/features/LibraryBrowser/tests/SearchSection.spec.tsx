import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import type { SongStatusType } from "@/data/types";
import { SearchSection } from "../components/SearchSection";

function SearchHarness() {
  const [query, setQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState<SongStatusType | "all">("all");

  return (
    <SearchSection
      query={query}
      setQuery={setQuery}
      statusQuery={statusQuery}
      setStatusQuery={setStatusQuery}
    />
  );
}

describe("SearchSection", () => {
  it("renders search input with placeholder", () => {
    render(
      <SearchSection
        query=""
        setQuery={jest.fn()}
        statusQuery="all"
        setStatusQuery={jest.fn()}
      />,
    );

    expect(
      screen.getByPlaceholderText("Buscar músicas, artistas ou pastas..."),
    ).toBeInTheDocument();
  });

  it("calls setQuery when typing", async () => {
    const user = userEvent.setup();

    render(<SearchHarness />);

    await user.type(screen.getByRole("searchbox"), "oasis");

    expect(screen.getByRole("searchbox")).toHaveValue("oasis");
  });

  it("displays the current query value", () => {
    render(
      <SearchSection
        query="wonderwall"
        setQuery={jest.fn()}
        statusQuery="all"
        setStatusQuery={jest.fn()}
      />,
    );

    expect(screen.getByRole("searchbox")).toHaveValue("wonderwall");
  });
});
