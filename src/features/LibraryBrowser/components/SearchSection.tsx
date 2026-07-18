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
};

export const SearchSection = ({
  query,
  setQuery,
  statusQuery,
  setStatusQuery,
}: SearchSectionProps) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <SearchInput query={query} setQuery={setQuery} />
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
