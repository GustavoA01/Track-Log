import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StatusItemType } from "@/data/types";
import { statusColors, statusItens } from "@/data/constants";
import { ChangeEvent } from "react";

type SearchSectionProps = {
  query: string;
  setQuery: (query: string) => void;
  statusQuery: StatusItemType["value"];
  setStatusQuery: (statusQuery: StatusItemType["value"]) => void;
};

export const SearchSection = ({
  query,
  setQuery,
  statusQuery,
  setStatusQuery,
}: SearchSectionProps) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <section className="relative flex-1">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={query}
        className="pl-9"
        placeholder="Buscar músicas, artistas ou pastas..."
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />
    </section>
    <Select
      value={statusQuery}
      onValueChange={(value) => setStatusQuery(value!)}
    >
      <SelectTrigger className="w-full sm:max-w-44 sm:ml-auto">
        <SelectValue>
          <span className={statusColors[statusQuery]}>
            {statusItens.find(({ value }) => value === statusQuery)?.label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {statusItens.map(({ label, value }) => (
          <SelectItem key={value} value={value} className="cursor-pointer">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
