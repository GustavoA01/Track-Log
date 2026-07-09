import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  songFormDefaultValues,
  songFormSchema,
  type SongFormValuesType,
} from "@/data/schemas/song-form";
import { FolderFields } from "../container/FolderFields";
import { folders } from "./test-data";

function FolderFieldsForm({
  defaultValues = songFormDefaultValues,
  formFolders = folders,
}: {
  defaultValues?: SongFormValuesType;
  formFolders?: typeof folders;
}) {
  const methods = useForm<SongFormValuesType>({
    resolver: zodResolver(songFormSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FolderFields folders={formFolders} />
      </form>
    </FormProvider>
  );
}

describe("FolderFields", () => {
  it("renders empty state when user has no folders", () => {
    render(<FolderFieldsForm formFolders={[]} />);

    expect(
      screen.getByText(
        "Crie uma pasta na biblioteca para organizar suas músicas.",
      ),
    ).toBeInTheDocument();
  });

  it("renders selected folder badges", () => {
    render(
      <FolderFieldsForm
        defaultValues={{ ...songFormDefaultValues, folderIds: ["folder-1"] }}
      />,
    );

    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remover da pasta Rock" }),
    ).toBeInTheDocument();
  });

  it("adds a folder through select and button", async () => {
    const user = userEvent.setup();

    render(<FolderFieldsForm />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Rock" }));
    await user.click(screen.getByRole("button", { name: "Adicionar" }));

    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows message when song is in all folders", () => {
    render(
      <FolderFieldsForm
        defaultValues={{
          ...songFormDefaultValues,
          folderIds: ["folder-1", "folder-2"],
        }}
      />,
    );

    expect(
      screen.getByText("Esta música já está em todas as suas pastas."),
    ).toBeInTheDocument();
  });
});
