export const songKeys = {
  all: ["songs"] as const,
  detail: (id: string) => ["songs", id] as const,
};
