import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import type { SongStatusType } from "@/data/types";
import { BottomNav } from "@/components/BottomNav";
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
  it("keeps bottom navigation interactive while a select is open", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn((event) => event.preventDefault());

    render(
      <>
        <SearchHarness />
        <div onClick={onNavigate}>
          <BottomNav />
        </div>
      </>,
    );

    await user.click(
      screen.getByRole("combobox", { name: "Filtrar por instrumento" }),
    );

    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Histórico" }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an instrument with the keyboard and restores trigger focus", async () => {
    const user = userEvent.setup();

    render(<SearchHarness />);

    const trigger = screen.getByRole("combobox", {
      name: "Filtrar por instrumento",
    });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    await screen.findByRole("listbox");
    await user.keyboard("{End}{Enter}");

    expect(trigger).toHaveTextContent("Violão");
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
  it("keeps the menu fixed and navigation available on the first and second touch opening", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn((event) => event.preventDefault());

    render(
      <>
        <SearchHarness />
        <div onClick={onNavigate}>
          <BottomNav />
        </div>
      </>,
    );

    const trigger = screen.getByRole("combobox", {
      name: "Filtrar por instrumento",
    });
    const bodyStyles = document.body.getAttribute("style");
    const htmlStyles = document.documentElement.getAttribute("style");

    for (let opening = 0; opening < 2; opening++) {
      await user.pointer([
        { keys: "[TouchA>]", target: trigger },
        { keys: "[/TouchA]" },
      ]);

      const list = await screen.findByRole("listbox");
      const positioner = list.closest('[data-slot="select-positioner"]');

      await waitFor(() => {
        expect(positioner).toHaveStyle({ position: "fixed" });
      });
      expect(screen.getByRole("navigation")).toBeVisible();
      expect(document.body.getAttribute("style")).toBe(bodyStyles);
      expect(document.documentElement.getAttribute("style")).toBe(htmlStyles);

      await user.click(screen.getByRole("link", { name: "Histórico" }));
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    }

    expect(onNavigate).toHaveBeenCalledTimes(2);
  });
});
