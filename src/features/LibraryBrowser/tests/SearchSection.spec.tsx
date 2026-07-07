import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { SearchSection } from "../components/SearchSection";

function SearchHarness() {
  const [query, setQuery] = useState("");

  return <SearchSection query={query} setQuery={setQuery} />;
}

describe("SearchSection", () => {
  it("renders search input with placeholder", () => {
    render(<SearchSection query="" setQuery={jest.fn()} />);

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
    render(<SearchSection query="wonderwall" setQuery={jest.fn()} />);

    expect(screen.getByRole("searchbox")).toHaveValue("wonderwall");
  });
});
