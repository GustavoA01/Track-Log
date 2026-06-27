import { cn } from "@/lib/utils";

type RemoteImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
};

export const RemoteImage = ({
  src,
  alt,
  className,
  fill,
}: RemoteImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    className={cn(
      fill && "absolute inset-0 h-full w-full object-cover",
      className,
    )}
  />
);
