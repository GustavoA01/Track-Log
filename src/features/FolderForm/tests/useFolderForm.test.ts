import { act, renderHook } from "@testing-library/react";
import { folderFormDefaultValues } from "@/data/schemas/folder-form";
import { useFolderForm } from "../hooks/useFolderForm";
import { useCreateFolderMutation } from "../hooks/useCreateFolderMutation";
import { useUpdateFolderMutation } from "../hooks/useUpdateFolderMutation";

const createFolderFn = jest.fn();
const updateFolderFn = jest.fn();
const setOpen = jest.fn();

jest.mock("../hooks/useCreateFolderMutation", () => ({
  useCreateFolderMutation: jest.fn(() => ({
    createFolderFn,
    isPending: false,
    open: false,
    setOpen,
  })),
}));

jest.mock("../hooks/useUpdateFolderMutation", () => ({
  useUpdateFolderMutation: jest.fn(() => ({
    updateFolderFn,
    isPending: false,
  })),
}));

const mockUseCreateFolderMutation =
  useCreateFolderMutation as jest.MockedFunction<
    typeof useCreateFolderMutation
  >;
const mockUseUpdateFolderMutation =
  useUpdateFolderMutation as jest.MockedFunction<
    typeof useUpdateFolderMutation
  >;

describe("useFolderForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createFolderFn.mockResolvedValue(undefined);
    updateFolderFn.mockResolvedValue(undefined);

    mockUseCreateFolderMutation.mockReturnValue({
      createFolderFn,
      isPending: false,
      open: false,
      setOpen,
    });

    mockUseUpdateFolderMutation.mockReturnValue({
      updateFolderFn,
      isPending: false,
    });
  });

  it("uses create mutation state when not editing", () => {
    mockUseCreateFolderMutation.mockReturnValue({
      createFolderFn,
      isPending: true,
      open: true,
      setOpen,
    });

    const { result } = renderHook(() => useFolderForm());

    expect(result.current.isEditing).toBe(false);
    expect(result.current.open).toBe(true);
    expect(result.current.isSaving).toBe(true);
  });

  it("uses controlled open state when editing", () => {
    const onOpenChange = jest.fn();

    const { result } = renderHook(() =>
      useFolderForm({
        folderId: "folder-1",
        open: true,
        onOpenChange,
      }),
    );

    expect(result.current.isEditing).toBe(true);
    expect(result.current.open).toBe(true);
  });

  it("creates a folder on submit in create mode", async () => {
    const values = { name: "Rock", imageUrl: "" };

    const { result } = renderHook(() => useFolderForm());

    await act(async () => {
      await result.current.onSubmit(values);
    });

    expect(createFolderFn).toHaveBeenCalledWith(values);
    expect(updateFolderFn).not.toHaveBeenCalled();
    expect(result.current.methods.getValues()).toEqual(folderFormDefaultValues);
  });

  it("updates a folder on submit in edit mode", async () => {
    const onOpenChange = jest.fn();
    const values = { name: "Blues", imageUrl: "https://example.com/img.png" };

    const { result } = renderHook(() =>
      useFolderForm({
        folderId: "folder-1",
        open: true,
        onOpenChange,
      }),
    );

    await act(async () => {
      await result.current.onSubmit(values);
    });

    expect(updateFolderFn).toHaveBeenCalledWith({ id: "folder-1", values });
    expect(createFolderFn).not.toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(result.current.methods.getValues()).toEqual(folderFormDefaultValues);
  });

  it("resets form and closes dialog on cancel in create mode", () => {
    const { result } = renderHook(() => useFolderForm());

    act(() => {
      result.current.methods.setValue("name", "Teste");
    });

    act(() => {
      result.current.onCancel();
    });

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(result.current.methods.getValues()).toEqual(folderFormDefaultValues);
  });

  it("delegates open change to controlled callback when editing", () => {
    const onOpenChange = jest.fn();

    const { result } = renderHook(() =>
      useFolderForm({
        folderId: "folder-1",
        open: true,
        onOpenChange,
      }),
    );

    act(() => {
      result.current.setOpen(false);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(setOpen).not.toHaveBeenCalled();
  });
});
