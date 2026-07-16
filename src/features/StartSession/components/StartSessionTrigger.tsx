import { Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StartSessionDialog } from "../container/StartSessionDialog";

type StartSessionTriggerProps = {
  onStart: (minutes: number) => void;
};

export const StartSessionTrigger = ({ onStart }: StartSessionTriggerProps) => (
  <StartSessionDialog
    onStart={onStart}
    trigger={
      <Button size="lg" className="w-full sm:w-auto rounded-full">
        <Timer data-icon="inline-start" />
        Iniciar sessão de estudo
      </Button>
    }
  />
);
