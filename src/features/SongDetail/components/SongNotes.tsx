import { Pencil } from "lucide-react";
import Link from "next/link";

type SongNotesProps = {
  songId: string;
  notes: string;
};

export const SongNotes = ({ songId, notes }: SongNotesProps) => (
  <section className="space-y-2 rounded-xl border bg-muted/30 p-4">
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-xs font-medium text-muted-foreground">Anotações</h2>
      <Link
        href={`/musica/nova/?songId=${encodeURIComponent(songId)}&focus=notes#notes`}
        scroll={false}
        className="inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Pencil className="size-3" aria-hidden="true" />
        Editar anotações
      </Link>
    </div>
    <p
      className={
        notes ? "whitespace-pre-wrap text-sm" : "text-sm text-muted-foreground"
      }
    >
      {notes || "Nenhuma anotação por enquanto."}
    </p>
  </section>
);
