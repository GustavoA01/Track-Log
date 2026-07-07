import {
  formValuesToSongPayload,
  songFormDefaultValues,
  songToFormValues,
} from "@/data/schemas/song-form";
import { song } from "./test-data";

describe("song-form schema helpers", () => {
  it("maps song to form values", () => {
    expect(songToFormValues(song)).toEqual({
      title: "Wonderwall",
      artist: "Oasis",
      status: "learning",
      difficulty: 3,
      imageUrl: "https://example.com/wonderwall.jpg",
      videoUrl: "https://www.youtube.com/watch?v=abc123",
      tabUrl: "https://example.com/tab",
      genre: "Rock",
      instrument: "Violão",
      notes: "Focar no refrão",
    });
  });

  it("maps empty optional urls to empty strings", () => {
    expect(
      songToFormValues({
        ...song,
        imageUrl: undefined,
        videoUrl: undefined,
        tabUrl: undefined,
      }),
    ).toMatchObject({
      imageUrl: "",
      videoUrl: "",
      tabUrl: "",
    });
  });

  it("maps form values to song payload", () => {
    expect(
      formValuesToSongPayload({
        ...songFormDefaultValues,
        title: "Wonderwall",
        artist: "Oasis",
        imageUrl: "https://example.com/cover.jpg",
        videoUrl: "",
        tabUrl: "https://example.com/tab",
      }),
    ).toEqual({
      title: "Wonderwall",
      artist: "Oasis",
      status: "want_to_learn",
      difficulty: 3,
      imageUrl: "https://example.com/cover.jpg",
      videoUrl: undefined,
      tabUrl: "https://example.com/tab",
      genre: "",
      instrument: "",
      notes: "",
    });
  });
});
