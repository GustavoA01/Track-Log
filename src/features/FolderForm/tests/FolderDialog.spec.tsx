import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  folderFormDefaultValues,
  type FolderFormValuesType,
} from "@/data/schemas/folder-form";
import { FolderDialog } from "../container/FolderDialog";
import { useFolderForm } from "../hooks/useFolderForm";

const getFolderById = jest.fn();

jest.mock("../../../actions/folders/getFolderById", () => ({
  getFolderById: (...args: unknown[]) => getFolderById(...args),
}));

const onCancel = jest.fn();
const onSubmit = jest.fn();
const setOpen = jest.fn();

const mockUseFolderForm = useFolderForm as jest.MockedFunction<
  typeof useFolderForm
>;

jest.mock("../hooks/useFolderForm", () => ({
  useFolderForm: jest.fn(),
}));

const mockGetFolderById = getFolderById as jest.MockedFunction<
  typeof getFolderById
>;

let methods: UseFormReturn<FolderFormValuesType>;

function createFolderFormMock(
  overrides: Partial<ReturnType<typeof useFolderForm>> = {},
) {
  return {
    isEditing: false,
    open: true,
    setOpen,
    isSaving: false,
    methods,
    onCancel,
    onSubmit,
    ...overrides,
  };
}

describe("FolderDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const { result } = renderHook(() =>
      useForm<FolderFormValuesType>({
        defaultValues: folderFormDefaultValues,
      }),
    );
    methods = result.current;

    mockUseFolderForm.mockReturnValue(createFolderFormMock());
    mockGetFolderById.mockReset();
    mockGetFolderById.mockResolvedValue({
      id: "folder-1",
      name: "Rock",
      imageUrl: "https://example.com/cover.jpg",
      color: "#0d9488",
      userId: "user-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it("renders create mode with default submit label", () => {
    render(<FolderDialog />);

    expect(
      screen.getByRole("heading", { name: "Nova pasta" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar pasta" }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="dialog-trigger"]'),
    ).toBeInTheDocument();
  });

  it("renders edit mode with save label and without trigger", () => {
    mockUseFolderForm.mockReturnValue(
      createFolderFormMock({ isEditing: true, open: true }),
    );

    render(<FolderDialog folderId="folder-1" editOpen />);

    expect(screen.getByText("Editar pasta")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Salvar alterações" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^nova pasta$/i }),
    ).not.toBeInTheDocument();
  });

  it("loads folder data when editing", async () => {
    mockUseFolderForm.mockReturnValue(
      createFolderFormMock({ isEditing: true, open: true }),
    );

    render(<FolderDialog folderId="folder-1" editOpen />);

    await waitFor(() => {
      expect(mockGetFolderById).toHaveBeenCalledWith("folder-1");
    });

    expect(await screen.findByDisplayValue("Rock")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("https://example.com/cover.jpg"),
    ).toBeInTheDocument();
  });

  it("calls onCancel from footer", async () => {
    const user = userEvent.setup();

    render(<FolderDialog />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
