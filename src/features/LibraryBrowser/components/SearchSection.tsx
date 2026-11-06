import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StatusItemType } from "@/data/types";
import { statusColors, statusItens } from "@/data/constants";
import { SearchInput } from "@/components/SearchInput";

type SearchSectionProps = {
  query: string;
  setQuery: (query: string) => void;
  statusQuery: StatusItemType["value"];
  setStatusQuery: (statusQuery: StatusItemType["value"]) => void;
  instrumentQuery: string;
  setInstrumentQuery: (instrumentQuery: string) => void;
  instrumentOptions: string[];
};

export const SearchSection = ({
  query,
  setQuery,
  statusQuery,
  setStatusQuery,
  instrumentQuery,
  setInstrumentQuery,
  instrumentOptions,
}: SearchSectionProps) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <SearchInput query={query} setQuery={setQuery} />
    <div className="flex w-full flex-col gap-2 sm:ml-auto sm:w-auto sm:shrink-0 sm:flex-row">
      <Select
        value={statusQuery}
        onValueChange={(value) => setStatusQuery(value!)}
      >
        <SelectTrigger
          aria-label="Filtrar por status"
          className="w-full sm:w-44"
        >
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
      {instrumentOptions.length > 0 && (
        <Select
          value={instrumentQuery}
          onValueChange={(value) => setInstrumentQuery(value!)}
        >
          <SelectTrigger
            aria-label="Filtrar por instrumento"
            className="w-full sm:w-44"
          >
            <SelectValue>
              {instrumentQuery === "all" ? "Instrumentos" : instrumentQuery}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              Todos
            </SelectItem>
            {instrumentOptions.map((instrument) => (
              <SelectItem
                key={instrument}
                value={instrument}
                className="cursor-pointer"
              >
                {instrument}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  </div>
);
