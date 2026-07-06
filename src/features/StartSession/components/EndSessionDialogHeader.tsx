import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EndSessionDialogHeaderProps = {
  songTitle: string;
  songArtist: string;
  minutes: number;
};

export const EndSessionDialogHeader = ({
  songTitle,
  songArtist,
  minutes,
}: EndSessionDialogHeaderProps) => (
  <DialogHeader>
    <DialogTitle>Encerrar sessão</DialogTitle>
    <DialogDescription>
      {songTitle} · {songArtist} · {minutes}{" "}
      {minutes === 1 ? "minuto praticado" : "minutos praticados"}
    </DialogDescription>
  </DialogHeader>
);
