import { act, renderHook } from "@testing-library/react";
import { songFormDefaultValues } from "@/data/schemas/song-form";
import { useSongForm } from "../hooks/useSongForm";
import { song, validFormValues } from "./test-data";
import { useCreateSongMutation } from "../hooks/useCreateSongMutation";
import { useUpdateSongMutation } from "../hooks/useUpdateSongMutation";

const createSongFn = jest.fn();
const updateSongFn = jest.fn();
const back = jest.fn();

jest.mock("../hooks/useCreateSongMutation", () => ({
  useCreateSongMutation: jest.fn(() => ({
    createSongFn,
    isPending: false,
    goBack: back,
  })),
}));

jest.mock("../hooks/useUpdateSongMutation", () => ({
  useUpdateSongMutation: jest.fn(() => ({
    updateSongFn,
    isPending: false,
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    back,
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  })),
}));



const mockUseCreateSongMutation =
  useCreateSongMutation as jest.MockedFunction<typeof useCreateSongMutation>;
const mockUseUpdateSongMutation =
  useUpdateSongMutation as jest.MockedFunction<typeof useUpdateSongMutation>;

describe("useSongForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createSongFn.mockResolvedValue(undefined);
    updateSongFn.mockResolvedValue(undefined);

    mockUseCreateSongMutation.mockReturnValue({
      createSongFn,
      isPending: false,
      goBack: back,
    });

    mockUseUpdateSongMutation.mockReturnValue({
      updateSongFn,
      isPending: false,
    });
  });

  it("initializes create mode by default", () => {
    const { result } = renderHook(() => useSongForm());

    expect(result.current.isEditing).toBe(false);
    expect(result.current.isSaving).toBe(false);
    expect(result.current.methods.getValues()).toEqual(songFormDefaultValues);
  });

  it("initializes edit mode when song is provided", () => {
    const { result } = renderHook(() => useSongForm(song));

    expect(result.current.isEditing).toBe(true);
  });

  it("creates a song on submit in create mode", async () => {
    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.methods.reset(validFormValues);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createSongFn).toHaveBeenCalledWith(validFormValues);
    expect(updateSongFn).not.toHaveBeenCalled();
  });

  it("updates a song on submit in edit mode", async () => {
    const { result } = renderHook(() => useSongForm(song));

    act(() => {
      result.current.methods.reset(validFormValues);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(updateSongFn).toHaveBeenCalledWith({
      songId: "song-1",
      data: validFormValues,
    });
    expect(createSongFn).not.toHaveBeenCalled();
  });

  it("tracks saving state from mutations", () => {
    mockUseCreateSongMutation.mockReturnValue({
      createSongFn,
      isPending: true,
      goBack: back,
    });

    const { result } = renderHook(() => useSongForm());

    expect(result.current.isSaving).toBe(true);
  });

  it("calls router.back on cancel", () => {
    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.handleCancel();
    });

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("watches imageUrl changes", () => {
    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.methods.setValue("imageUrl", "https://example.com/cover.jpg");
    });

    expect(result.current.imageUrl).toBe("https://example.com/cover.jpg");
  });
});
