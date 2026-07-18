import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";

type SearchInputProps = {
  query: string;
  setQuery: (query: string) => void;
  placeholder?: string;
};

export const SearchInput = ({
  query,
  setQuery,
  placeholder = "Buscar músicas, artistas ou pastas...",
}: SearchInputProps) => (
  <section className="relative flex-1">
    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      type="search"
      value={query}
      className="pl-9"
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setQuery(event.target.value)
      }
    />
  </section>
);
