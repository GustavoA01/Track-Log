import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  songFormDefaultValues,
  songFormSchema,
  type SongFormValuesType,
} from "@/data/schemas/song-form";
import { ExtraFields } from "../container/ExtraFields";

function ExtraFieldsForm() {
  const methods = useForm<SongFormValuesType>({
    resolver: zodResolver(songFormSchema),
    defaultValues: {
      ...songFormDefaultValues,
      title: "Wonderwall",
      artist: "Oasis",
    },
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(jest.fn())}>
        <ExtraFields />
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  );
}

describe("ExtraFields", () => {
  it("renders resource url fields", () => {
    render(<ExtraFieldsForm />);

    expect(screen.getByLabelText("URL da imagem")).toBeInTheDocument();
    expect(screen.getByLabelText("Vídeo de referência")).toBeInTheDocument();
    expect(screen.getByLabelText("Link da tablatura")).toBeInTheDocument();
  });

  it("shows validation error for invalid image url", async () => {
    const user = userEvent.setup();
    render(<ExtraFieldsForm />);

    await user.type(screen.getByLabelText("URL da imagem"), "invalid-url");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(
      await screen.findByText("Informe uma URL válida"),
    ).toBeInTheDocument();
  });
});
