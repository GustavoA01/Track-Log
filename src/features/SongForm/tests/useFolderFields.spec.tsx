import { act, renderHook } from "@testing-library/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type { ReactNode } from "react";
import {
  songFormDefaultValues,
  type SongFormValuesType,
} from "@/data/schemas/song-form";
import { useFolderFields } from "../hooks/useFolderFields";
import { folders } from "./test-data";

function createWrapper(defaultValues?: Partial<SongFormValuesType>) {
  return function Wrapper({ children }: { children: ReactNode }) {
    const methods = useForm<SongFormValuesType>({
      defaultValues: {
        ...songFormDefaultValues,
        ...defaultValues,
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };
}

function useFolderFieldsHarness() {
  const fields = useFolderFields(folders);
  const { getValues } = useFormContext<SongFormValuesType>();

  return { fields, getValues };
}

describe("useFolderFields", () => {
  it("lists all folders as available when none are selected", () => {
    const { result } = renderHook(() => useFolderFieldsHarness(), {
      wrapper: createWrapper(),
    });

    expect(result.current.fields.selectedFolders).toEqual([]);
    expect(result.current.fields.availableFolders).toEqual(folders);
  });

  it("splits selected and available folders", () => {
    const { result } = renderHook(() => useFolderFieldsHarness(), {
      wrapper: createWrapper({ folderIds: ["folder-1"] }),
    });

    expect(result.current.fields.selectedFolders).toEqual([folders[0]]);
    expect(result.current.fields.availableFolders).toEqual([folders[1]]);
  });

  it("adds a folder to form values", () => {
    const { result } = renderHook(() => useFolderFieldsHarness(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.fields.setSelectedFolderId("folder-1");
    });

    act(() => {
      result.current.fields.handleAddFolder();
    });

    expect(result.current.getValues("folderIds")).toEqual(["folder-1"]);
    expect(result.current.fields.selectedFolderId).toBe("");
  });

  it("does not add duplicate folders", () => {
    const { result } = renderHook(() => useFolderFieldsHarness(), {
      wrapper: createWrapper({ folderIds: ["folder-1"] }),
    });

    act(() => {
      result.current.fields.setSelectedFolderId("folder-1");
      result.current.fields.handleAddFolder();
    });

    expect(result.current.getValues("folderIds")).toEqual(["folder-1"]);
  });

  it("removes a folder from form values", () => {
    const { result } = renderHook(() => useFolderFieldsHarness(), {
      wrapper: createWrapper({ folderIds: ["folder-1", "folder-2"] }),
    });

    act(() => {
      result.current.fields.handleRemoveFolder("folder-1");
    });

    expect(result.current.getValues("folderIds")).toEqual(["folder-2"]);
  });
});
