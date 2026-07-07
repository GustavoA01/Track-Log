import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  folderFormDefaultValues,
  folderFormSchema,
  type FolderFormValuesType,
} from "@/data/schemas/folder-form";
import { FolderFormFields } from "../container/FolderFormFields";

function TestForm() {
  const methods = useForm<FolderFormValuesType>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: folderFormDefaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(jest.fn())}>
        <FolderFormFields />
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  );
}

describe("FolderFormFields", () => {
  it("renders name and image URL fields", () => {
    render(<TestForm />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("URL da imagem")).toBeInTheDocument();
    expect(screen.getByText("Prévia da capa")).toBeInTheDocument();
  });

  it("shows validation error for empty name", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("Nome é obrigatório")).toBeInTheDocument();
  });

  it("shows validation error for invalid image URL", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.type(screen.getByLabelText("Nome"), "Rock");
    await user.type(screen.getByLabelText("URL da imagem"), "not-a-url");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(
      await screen.findByText("Informe uma URL válida"),
    ).toBeInTheDocument();
  });

  it("shows image preview when URL is provided", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.type(
      screen.getByLabelText("URL da imagem"),
      "https://example.com/cover.jpg",
    );

    await waitFor(() => {
      expect(
        screen.getByRole("img", { name: "Prévia da capa" }),
      ).toHaveAttribute("src", "https://example.com/cover.jpg");
    });
  });
});
