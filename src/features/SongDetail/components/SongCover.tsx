import Image from "next/image";
import { Music } from "lucide-react";
import { cn } from "@/lib/utils";

type SongCoverProps = {
  title: string;
  imageUrl?: string;
  accentColor: string;
  fallbackColor?: string;
  className?: string;
};

export const SongCover = ({
  title,
  imageUrl,
  accentColor,
  fallbackColor,
  className,
}: SongCoverProps) => {
  if (imageUrl) {
    return (
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-foreground/10",
          className,
        )}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 280px, 360px"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-2xl shadow-2xl ring-1 ring-foreground/10",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${fallbackColor ?? accentColor} 25%, var(--background))`,
      }}
    >
      <Music
        className="size-20 text-muted-foreground/60 lg:size-24"
        style={{ color: fallbackColor ?? accentColor }}
      />
    </div>
  );
};
