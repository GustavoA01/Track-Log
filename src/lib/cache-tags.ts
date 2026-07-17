export const cacheTags = {
  songs: (userId: string) => `songs:${userId}`,
  folders: (userId: string) => `folders:${userId}`,
  sessions: (userId: string) => `sessions:${userId}`,
};
