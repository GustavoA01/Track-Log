export const folderKeys = {
  all: ["folders"] as const,
  detail: (id: string) => ["folders", id] as const,
};
