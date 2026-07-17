import { SortByType } from "@/data/types";
import { ArrowDownUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { sortItens } from "@/data/constants";

type MusicSectionHeaderProps = {
  songsLength: number;
  selectedFolderId: string | null;
  selectedFolderName: string;
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
  reverseSongs: boolean;
  setReverseSongs: (reverseSongs: boolean) => void;
};

export const MusicSectionHeader = ({
  songsLength,
  selectedFolderId,
  selectedFolderName,
  sortBy,
  setSortBy,
  reverseSongs,
  setReverseSongs,
}: MusicSectionHeaderProps) => (
  <header className="flex items-center justify-between gap-3">
    <div className="flex items-center">
      <h2 className="text-sm font-medium">Músicas</h2>
      <span className="ml-1.5 font-normal text-muted-foreground">
        ({songsLength})
      </span>
    </div>

    <div className="flex items-center gap-2">
      {selectedFolderId && (
        <Link
          href={`/musica/nova?folderId=${selectedFolderId}`}
          aria-label={`Nova música em ${selectedFolderName}`}
          className={cn(
            "min-w-0 max-sm:max-w-28 max-sm:rounded-full",
            buttonVariants({ variant: "outline", size: "sm" }),
          )}
        >
          <Plus data-icon="inline-start" />
          <span className="min-w-0 truncate">
            <span className="max-sm:sr-only">Nova música em </span>
            {selectedFolderName}
          </span>
        </Link>
      )}

      <Select value={sortBy} onValueChange={(value) => setSortBy(value!)}>
        <SelectTrigger className="min-w-0 shrink sm:min-w-44">
          <SelectValue>
            {sortItens.find((item) => item.value === sortBy)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {sortItens.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        size="icon"
        type="button"
        variant={reverseSongs ? "default" : "outline"}
        onClick={() => setReverseSongs(!reverseSongs)}
        className="rounded-full transition-all duration-200"
        aria-label={reverseSongs ? "Ordem normal" : "Inverter ordem"}
      >
        <ArrowDownUp
          className={cn(
            "transition-all duration-200",
            reverseSongs && "rotate-180",
          )}
        />
      </Button>
    </div>
  </header>
);
