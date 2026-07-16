import { act, renderHook } from "@testing-library/react";
import { useSongDetailContent } from "../hooks/useSongDetailContent";
import { sessions, song } from "./test-data";

const updateSongResources = jest.fn();

jest.mock("@/actions/songs/updateSongResources", () => ({
  updateSongResources: (...args: unknown[]) => updateSongResources(...args),
}));

describe("useSongDetailContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes song state and session stats", () => {
    const { result } = renderHook(() =>
      useSongDetailContent({ initialSong: song, sessions }),
    );

    expect(result.current.song).toEqual(song);
    expect(result.current.sessionCount).toBe(2);
    expect(result.current.totalMinutes).toBe(75);
    expect(result.current.deleteDialogOpen).toBe(false);
  });

  it("updates song state", () => {
    const { result } = renderHook(() =>
      useSongDetailContent({ initialSong: song, sessions }),
    );

    act(() => {
      result.current.setSong({ ...song, title: "Champagne Supernova" });
    });

    expect(result.current.song.title).toBe("Champagne Supernova");
  });

  it("controls delete dialog state", () => {
    const { result } = renderHook(() =>
      useSongDetailContent({ initialSong: song, sessions }),
    );

    act(() => {
      result.current.setDeleteDialogOpen(true);
    });

    expect(result.current.deleteDialogOpen).toBe(true);
  });

  it("updates media via onChangeMedia", async () => {
    const updatedSong = { ...song, videoUrl: "https://youtu.be/new" };
    updateSongResources.mockResolvedValue(updatedSong);

    const { result } = renderHook(() =>
      useSongDetailContent({ initialSong: song, sessions }),
    );

    await act(async () => {
      await result.current.onChangeMedia({
        videoUrl: "https://youtu.be/new",
      });
    });

    expect(updateSongResources).toHaveBeenCalledWith("song-1", {
      videoUrl: "https://youtu.be/new",
    });
    expect(result.current.song.videoUrl).toBe("https://youtu.be/new");
  });

  it.each([
    [
      "https://www.youtube.com/watch?v=abc123",
      "https://www.youtube.com/embed/abc123",
    ],
    ["https://youtu.be/abc123", "https://www.youtube.com/embed/abc123"],
    [
      "https://www.youtube.com/embed/abc123",
      "https://www.youtube.com/embed/abc123",
    ],
    ["https://example.com/video", null],
    ["invalid-url", null],
  ])("parses YouTube embed url for %s", (input, expected) => {
    const { result } = renderHook(() =>
      useSongDetailContent({ initialSong: song, sessions }),
    );

    expect(result.current.getYouTubeEmbedUrl(input)).toBe(expected);
  });
});
