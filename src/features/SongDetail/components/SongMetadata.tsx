import { Calendar, Guitar, Music2, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SongType } from "@/data/types";

type SongMetadataProps = {
  song: SongType;
};

type MetadataItem = {
  label: string;
  value: string;
  icon: React.ElementType;
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

function buildMetadataItems(song: SongType): MetadataItem[] {
  const items: MetadataItem[] = [
    {
      label: "Data de criação",
      value: formatDate(song.createdAt),
      icon: Calendar,
    },
  ];

  if (song.instrument) {
    items.push({
      label: "Instrumento",
      value: song.instrument,
      icon: Guitar,
    });
  }

  if (song.genre) {
    items.push({
      label: "Gênero",
      value: song.genre,
      icon: Music2,
    });
  }

  if (song.difficulty > 0) {
    items.push({
      label: "Dificuldade",
      value: `${song.difficulty}/5`,
      icon: Star,
    });
  }

  return items;
}

export function SongMetadata({ song }: SongMetadataProps) {
  const items = buildMetadataItems(song);

  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-medium">Informações</h2>
        <p className="text-sm text-muted-foreground">Detalhes da música</p>
      </div>

      <Card>
        <CardHeader className="sr-only">
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3"
              >
                <item.icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
