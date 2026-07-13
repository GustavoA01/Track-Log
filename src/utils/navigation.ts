export const songDetailFrom = {
  historico: "historico",
} as const;

export type SongDetailFrom =
  (typeof songDetailFrom)[keyof typeof songDetailFrom];

export const getSongDetailHref = (songId: string, from?: SongDetailFrom) =>
  from ? `/musica/${songId}?from=${from}` : `/musica/${songId}`;

export const getSongDetailBackHref = (from?: string | null) =>
  from === songDetailFrom.historico ? "/historico" : "/";
