export const sessionKeys = {
  all: ["sessions"] as const,
  bySong: (songId: string) => [...sessionKeys.all, "song", songId] as const,
  stats: () => [...sessionKeys.all, "stats"] as const,
};
