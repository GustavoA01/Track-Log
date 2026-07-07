import {
  getSongDetailBackHref,
  getSongDetailHref,
  songDetailFrom,
} from "@/lib/navigation";

describe("navigation", () => {
  it("builds song detail href without source", () => {
    expect(getSongDetailHref("song-1")).toBe("/musica/song-1");
  });

  it("builds song detail href with source", () => {
    expect(getSongDetailHref("song-1", songDetailFrom.historico)).toBe(
      "/musica/song-1?from=historico",
    );
  });

  it("returns historico back href when coming from historico", () => {
    expect(getSongDetailBackHref(songDetailFrom.historico)).toBe("/historico");
  });

  it("returns home back href by default", () => {
    expect(getSongDetailBackHref()).toBe("/");
    expect(getSongDetailBackHref("outro")).toBe("/");
  });
});
