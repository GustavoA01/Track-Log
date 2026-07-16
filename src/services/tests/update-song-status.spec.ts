/**
 * @jest-environment node
 */
import { updateSongStatus } from "@/actions/songs/updateSongStatus";

const findFirst = jest.fn();
const update = jest.fn();
const getSongFolderIds = jest.fn();
const getCurrentUserId = jest.fn();
const revalidatePath = jest.fn();

jest.mock("@/lib/auth", () => ({
  getCurrentUserId: (...args: unknown[]) => getCurrentUserId(...args),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    song: {
      findFirst: (...args: unknown[]) => findFirst(...args),
      update: (...args: unknown[]) => update(...args),
    },
  },
}));

jest.mock("@/actions/songs/folderUtils", () => ({
  getSongFolderIds: (...args: unknown[]) => getSongFolderIds(...args),
}));

jest.mock("next/cache", () => ({
  revalidatePath: (...args: unknown[]) => revalidatePath(...args),
}));

describe("updateSongStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getCurrentUserId.mockResolvedValue("user-1");
    getSongFolderIds.mockResolvedValue(["folder-1"]);
  });

  it("updates song status and revalidates paths", async () => {
    findFirst.mockResolvedValue({ id: "song-1" });
    update.mockResolvedValue({
      id: "song-1",
      title: "Wonderwall",
      artist: "Oasis",
      genre: "Rock",
      instrument: "Violão",
      difficulty: 3,
      status: "learned",
      createdAt: new Date(2026, 0, 15),
      notes: "",
      imageUrl: null,
      videoUrl: null,
      tabUrl: null,
      accentColor: null,
      userId: "user-1",
      updatedAt: new Date(2026, 0, 15),
    });

    const result = await updateSongStatus("song-1", "learned");

    expect(update).toHaveBeenCalledWith({
      where: { id: "song-1" },
      data: { status: "learned" },
    });
    expect(revalidatePath).toHaveBeenCalledWith("/");
    expect(revalidatePath).toHaveBeenCalledWith("/musica/song-1");
    expect(result.status).toBe("learned");
  });

  it("throws when song is missing", async () => {
    findFirst.mockResolvedValue(null);

    await expect(updateSongStatus("missing", "learned")).rejects.toThrow(
      "Música não encontrada",
    );
    expect(update).not.toHaveBeenCalled();
  });
});
