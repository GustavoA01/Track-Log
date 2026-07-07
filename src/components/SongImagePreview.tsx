import { RemoteImage } from "@/components/RemoteImage";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SongImagePreviewProps = {
  imageUrl?: string;
  className?: string;
  isFolder?: boolean;
};

export const SongImagePreview = ({
  imageUrl,
  className,
  isFolder = false,
}: SongImagePreviewProps) => {
  if (imageUrl) {
    return (
      <div
        className={cn(
          "relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border bg-muted/30 max-sm:max-w-full",
          className,
          isFolder && "m-auto",
        )}
      >
        <RemoteImage src={imageUrl} alt="Prévia da capa" fill />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex aspect-square w-full max-w-[200px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/20 text-muted-foreground",
        className,
        isFolder && "m-auto sm:max-w-64 ",
      )}
    >
      <ImageIcon className="size-8 opacity-60" />
      <p className="px-4 text-center text-xs select-none">Prévia da capa</p>
    </div>
  );
};
