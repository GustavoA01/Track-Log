import { CardDescription } from "@/components/ui/card";
import { Dot } from "lucide-react";

type HistoricalDescriptionProps = {
  totalSessions: number;
  totalTime: number;
};

export const HistoricalDescription = ({
  totalSessions,
  totalTime,
}: HistoricalDescriptionProps) => (
  <CardDescription>
    {totalSessions === 0 ? (
      <span className="text-muted-foreground">
        Nenhuma sessão registrada ainda
      </span>
    ) : (
      <div className="flex items-center ">
        <span>
          {totalSessions} {totalSessions === 1 ? "sessão" : "sessões"}
        </span>
        <Dot className="text-primary" />
        <span>{totalTime} min</span>
      </div>
    )}
  </CardDescription>
);
