import {
  toFolderType,
  toPracticeSessionType,
  toSongType,
} from "@/utils/mappers";

describe("mappers", () => {
  it("maps folder and converts null imageUrl to undefined", () => {
    expect(
      toFolderType({
        id: "folder-1",
        name: "Rock",
        color: "#0d9488",
        imageUrl: null,
        userId: "user-1",
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
      }),
    ).toEqual({
      id: "folder-1",
      name: "Rock",
      color: "#0d9488",
      imageUrl: undefined,
    });
  });

  it("maps song with defaults and optional null fields", () => {
    const updatedAt = new Date("2026-01-15T00:00:00.000Z");

    expect(
      toSongType({
        id: "song-1",
        title: "Blackbird",
        artist: "The Beatles",
        genre: "Rock",
        instrument: "Violão",
        difficulty: 3,
        status: "learning",
        createdAt: new Date(2026, 0, 15),
        notes: "Estudo",
        imageUrl: null,
        videoUrl: null,
        tabUrl: null,
        accentColor: null,
        userId: "user-1",
        updatedAt,
      }),
    ).toEqual({
      id: "song-1",
      folderIds: [],
      title: "Blackbird",
      artist: "The Beatles",
      genre: "Rock",
      instrument: "Violão",
      difficulty: 3,
      status: "learning",
      createdAt: "2026-01-15",
      updatedAt,
      notes: "Estudo",
      imageUrl: undefined,
      videoUrl: undefined,
      tabUrl: undefined,
      accentColor: undefined,
      sessionsTotalTime: 0,
    });
  });

  it("maps song with folder ids and total session time", () => {
    const updatedAt = new Date("2026-01-16T12:30:00.000Z");
    const song = toSongType(
      {
        id: "song-1",
        title: "Blackbird",
        artist: "The Beatles",
        genre: "Rock",
        instrument: "Violão",
        difficulty: 3,
        status: "learning",
        createdAt: new Date(2026, 0, 15),
        notes: "",
        imageUrl: "https://img.test/song.png",
        videoUrl: "https://video.test",
        tabUrl: "https://tab.test",
        accentColor: "#111111",
        userId: "user-1",
        updatedAt,
      },
      45,
      ["folder-1", "folder-2"],
    );

    expect(song.sessionsTotalTime).toBe(45);
    expect(song.folderIds).toEqual(["folder-1", "folder-2"]);
    expect(song.imageUrl).toBe("https://img.test/song.png");
    expect(song.accentColor).toBe("#111111");
    expect(song.updatedAt).toBe(updatedAt);
  });

  it("maps practice session date to date-only string", () => {
    expect(
      toPracticeSessionType({
        id: "session-1",
        songId: "song-1",
        date: new Date(2026, 5, 21),
        minutes: 30,
        notes: "Boa sessão",
        createdAt: new Date("2026-06-21"),
        updatedAt: new Date("2026-06-21"),
      }),
    ).toEqual({
      id: "session-1",
      songId: "song-1",
      date: "2026-06-21",
      minutes: 30,
      notes: "Boa sessão",
    });
  });
});
