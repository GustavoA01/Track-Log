import { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";

type ExtractedPalette = {
  url: string;
  color: string;
};

const FALLBACK_PRIMARY = "#7c3aed";

const getPrimaryColor = () => {
  if (typeof window === "undefined") return FALLBACK_PRIMARY;

  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || FALLBACK_PRIMARY
  );
};

export const useHeroAccentColor = (imageUrl?: string) => {
  const [palette, setPalette] = useState<ExtractedPalette | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    let cancelled = false;

    Vibrant.from(imageUrl)
      .getPalette()
      .then((result) => {
        if (cancelled) return;

        const color =
          result.Vibrant?.hex ??
          result.Muted?.hex ??
          result.DarkVibrant?.hex ??
          getPrimaryColor();

        setPalette({ url: imageUrl, color });
      })
      .catch(() => {
        if (!cancelled) {
          setPalette({ url: imageUrl, color: getPrimaryColor() });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  if (!imageUrl) return "var(--primary)";
  if (palette?.url === imageUrl) return palette.color;

  return getPrimaryColor();
};
