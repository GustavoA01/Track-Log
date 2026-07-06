import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PracticeSessionType, SongType } from "@/data/types";
import { SessionHistoryList } from "./SessionHistoryList";

type RecentSessionsProps = {
  songs: SongType[];
  sessions: PracticeSessionType[];
};

export const RecentSessions = ({ songs, sessions }: RecentSessionsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Histórico recente</CardTitle>
      <CardDescription>Suas últimas sessões de estudo</CardDescription>
      <CardAction>
        <Link
          href="/historico"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          Ver histórico completo
        </Link>
      </CardAction>
    </CardHeader>
    <CardContent>
      <SessionHistoryList sessions={sessions} songs={songs} limit={5} />
    </CardContent>
  </Card>
);
