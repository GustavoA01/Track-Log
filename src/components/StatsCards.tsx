import { BookOpen, Clock, Music2, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SongType } from "@/data/types";

type PracticeStats = {
  totalMinutes: number;
  weeklyMinutes: number;
  sessionCount: number;
};

type StatsCardsProps = {
  songs: SongType[];
  practiceStats: PracticeStats;
};

export function StatsCards({ songs, practiceStats }: StatsCardsProps) {
  const stats = [
    {
      label: "Músicas",
      value: songs.length,
      description: `${songs.filter((s) => s.status === "learning").length} em aprendizado`,
      icon: Music2,
    },
    {
      label: "Esta semana",
      value: `${practiceStats.weeklyMinutes} min`,
      description: "Tempo de prática",
      icon: Clock,
    },
    {
      label: "Total praticado",
      value: `${practiceStats.totalMinutes} min`,
      description: `${practiceStats.sessionCount} sessões registradas`,
      icon: TrendingUp,
    },
    {
      label: "Aprendidas",
      value: songs.filter((s) => s.status === "learned").length,
      description: `${songs.filter((s) => s.status === "want_to_learn").length} na fila`,
      icon: BookOpen,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardDescription>{stat.label}</CardDescription>
              <stat.icon className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
