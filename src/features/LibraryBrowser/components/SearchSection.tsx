import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchSectionProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchSection = ({ query, setQuery }: SearchSectionProps) => (
  <section className="relative">
    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Buscar músicas, artistas ou pastas..."
      value={query}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(event.target.value)
      }
      className="pl-9"
    />
  </section>
);
