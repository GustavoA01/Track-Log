import { Vibrant } from "node-vibrant/node";

const FALLBACK_ACCENT_COLOR = "#7c3aed";

export const extractAccentColorFromImageUrl = async (
  imageUrl: string,
): Promise<string> => {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();

    return (
      palette.Vibrant?.hex ??
      palette.Muted?.hex ??
      palette.DarkVibrant?.hex ??
      FALLBACK_ACCENT_COLOR
    );
  } catch {
    return FALLBACK_ACCENT_COLOR;
  }
};

export const resolveSongAccentColor = async (
  imageUrl: string | null | undefined,
  previousImageUrl?: string | null,
  previousAccentColor?: string | null,
): Promise<string | null> => {
  if (!imageUrl) return null;

  const isPrevious = imageUrl === previousImageUrl && previousAccentColor;

  if (isPrevious) return previousAccentColor;

  return extractAccentColorFromImageUrl(imageUrl);
};
