import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  songFormDefaultValues,
  songFormSchema,
  type SongFormValuesType,
} from "@/data/schemas/song-form";
import { BasicFields } from "../container/BasicFields";

function BasicFieldsForm() {
  const methods = useForm<SongFormValuesType>({
    resolver: zodResolver(songFormSchema),
    defaultValues: songFormDefaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(jest.fn())}>
        <BasicFields />
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  );
}

describe("BasicFields", () => {
  it("renders required fields", () => {
    render(<BasicFieldsForm />);

    expect(screen.getByLabelText("Título*")).toBeInTheDocument();
    expect(screen.getByLabelText("Artista*")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Gênero")).toBeInTheDocument();
    expect(screen.getByLabelText("Instrumento")).toBeInTheDocument();
    expect(screen.getByLabelText("Dificuldade")).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    const user = userEvent.setup();
    render(<BasicFieldsForm />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("Título é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Artista é obrigatório")).toBeInTheDocument();
  });
});
