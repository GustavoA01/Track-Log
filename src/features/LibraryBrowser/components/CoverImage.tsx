import { RemoteImage } from "@/components/RemoteImage";
import { FolderOpen, Music } from "lucide-react";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src?: string;
  alt: string;
  fallbackColor?: string;
  fallbackIcon?: "music" | "folder";
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "size-10 rounded-md",
  md: "aspect-square w-full rounded-lg",
  lg: "aspect-square w-full rounded-xl",
};

export const CoverImage = ({
  src,
  alt,
  fallbackColor = "var(--muted)",
  fallbackIcon = "music",
  className,
  size = "md",
}: CoverImageProps) => {
  const FallbackIcon = fallbackIcon === "folder" ? FolderOpen : Music;

  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          sizeClasses[size],
          className,
        )}
      >
        <RemoteImage src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: `${fallbackColor}20` }}
    >
      <FallbackIcon
        className={cn(
          "text-muted-foreground/70",
          size === "sm" ? "size-4" : "size-8",
        )}
        style={{ color: fallbackColor }}
      />
    </div>
  );
};
