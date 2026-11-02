import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import type { SongStatusType } from "@/data/types";
import { SearchSection } from "../components/SearchSection";

const instrumentProps = {
  instrumentQuery: "all",
  setInstrumentQuery: jest.fn(),
  instrumentOptions: ["Guitarra", "Violão"],
};

function SearchHarness() {
  const [query, setQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState<SongStatusType | "all">("all");
  const [instrumentQuery, setInstrumentQuery] = useState("all");

  return (
    <SearchSection
      query={query}
      setQuery={setQuery}
      statusQuery={statusQuery}
      setStatusQuery={setStatusQuery}
      instrumentQuery={instrumentQuery}
      setInstrumentQuery={setInstrumentQuery}
      instrumentOptions={instrumentProps.instrumentOptions}
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
        {...instrumentProps}
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
        {...instrumentProps}
      />,
    );

    expect(screen.getByRole("searchbox")).toHaveValue("wonderwall");
  });

  it("renders instrument filter options", async () => {
    const user = userEvent.setup();

    render(<SearchHarness />);

    await user.click(
      screen.getByRole("combobox", { name: "Filtrar por instrumento" }),
    );

    expect(
      await screen.findByRole("option", { name: "Todos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Guitarra" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Violão" })).toBeInTheDocument();
  });

  it("hides instrument filter when there are no options", () => {
    render(
      <SearchSection
        query=""
        setQuery={jest.fn()}
        statusQuery="all"
        setStatusQuery={jest.fn()}
        instrumentQuery="all"
        setInstrumentQuery={jest.fn()}
        instrumentOptions={[]}
      />,
    );

    expect(
      screen.queryByRole("combobox", { name: "Filtrar por instrumento" }),
    ).not.toBeInTheDocument();
  });
});
