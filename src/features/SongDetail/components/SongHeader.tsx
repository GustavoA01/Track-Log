import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type SongHeaderProps = {
  songId: string;
  handleDelete: () => void;
};

export const SongHeader = ({ songId, handleDelete }: SongHeaderProps) => (
  <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto flex h-14 items-center gap-3 px-4 sm:px-6">
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
      >
        <ArrowLeft data-icon="inline-start" />
        Voltar
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href={`/musica/${songId}/editar`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Pencil data-icon="inline-start" />
          Editar
        </Link>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 data-icon="inline-start" />
          Excluir
        </Button>
      </div>
    </div>
  </header>
);
