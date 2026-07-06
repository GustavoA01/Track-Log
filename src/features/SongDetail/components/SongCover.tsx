import { RemoteImage } from "@/components/RemoteImage";
import { cn } from "@/lib/utils";

type SongCoverProps = {
  title: string;
  imageUrl: string;
  className?: string;
};

export const SongCover = ({ title, imageUrl, className }: SongCoverProps) => (
  <div
    className={cn(
      "relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-foreground/10",
      className,
    )}
  >
    <RemoteImage src={imageUrl} alt={title} fill className="object-cover" />
  </div>
);
