import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { SongFormValuesType } from "@/data/schemas/song-form";
import { songFormDefaultValues } from "@/data/schemas/song-form";
import { SongForm } from "../container/SongForm";
import { useSongForm } from "../hooks/useSongForm";
import { song } from "./test-data";

type SongFormHookReturn = ReturnType<typeof useSongForm>;

const handleCancel = jest.fn();

const songFormMock: SongFormHookReturn = {
  methods: {} as UseFormReturn<SongFormValuesType>,
  reset: (() => undefined) as SongFormHookReturn["reset"],
  register: (() => ({}) as ReturnType<SongFormHookReturn["register"]>) as SongFormHookReturn["register"],
  handleSubmit: ((event) => {
    event?.preventDefault?.();
  }) as SongFormHookReturn["handleSubmit"],
  isSaving: false,
  isEditing: false,
  handleCancel,
  imageUrl: "",
};

jest.mock("../hooks/useSongForm", () => ({
  useSongForm: () => songFormMock,
}));

function SongFormHarness({ songProp }: { songProp?: typeof song }) {
  const methods = useForm<SongFormValuesType>({
    defaultValues: songFormDefaultValues,
  });

  songFormMock.methods = methods;
  songFormMock.reset = methods.reset;
  songFormMock.register = methods.register;
  songFormMock.handleSubmit = ((event) => {
    event?.preventDefault?.();
  }) as SongFormHookReturn["handleSubmit"];
  songFormMock.isEditing = Boolean(songProp?.id);
  songFormMock.isSaving = false;
  songFormMock.handleCancel = handleCancel;
  songFormMock.imageUrl = methods.watch("imageUrl");

  return <SongForm song={songProp} />;
}

describe("SongForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create mode labels", () => {
    render(<SongFormHarness />);

    expect(screen.getByText("Capa e recursos")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Criar música" })).toBeInTheDocument();
    expect(screen.getByLabelText("Anotações")).toBeInTheDocument();
  });

  it("renders edit mode submit label", () => {
    render(<SongFormHarness songProp={song} />);

    expect(screen.getByRole("button", { name: "Salvar alterações" })).toBeInTheDocument();
  });

  it("calls handleCancel from footer", async () => {
    const user = userEvent.setup();

    render(<SongFormHarness />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
