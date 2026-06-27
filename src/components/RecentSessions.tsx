import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { practiceSessions } from "@/data/mock-data";
import type { SongType } from "@/data/types";

type RecentSessionsProps = {
  songs: SongType[];
};

export const RecentSessions = ({ songs }: RecentSessionsProps) => {
  const recent = [...practiceSessions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico recente</CardTitle>
        <CardDescription>Suas últimas sessões de estudo</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Ver histórico
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {recent.map((session, index) => {
          const song = songs.find((item) => item.id === session.songId);

          return (
            <div key={session.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="truncate font-medium">
                    {song?.title ?? "Música desconhecida"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {song?.artist}
                  </p>
                  {session.notes && (
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {session.notes}
                    </p>
                  )}
                </div>
                <div className="shrink-0 space-y-1 text-right text-xs text-muted-foreground">
                  <div className="flex items-center justify-end gap-1">
                    <Calendar className="size-3" />
                    {format(new Date(session.date), "dd/MM/yyyy")}
                  </div>
                  <p className="font-medium text-foreground">
                    {session.minutes} min
                  </p>
                </div>
              </div>
              {index < recent.length - 1 && <Separator className="mt-4" />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
