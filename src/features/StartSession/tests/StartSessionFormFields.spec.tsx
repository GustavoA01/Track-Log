import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  startSessionSchema,
  type StartSessionValuesType,
} from "@/data/schemas/start-session";
import { StartSessionFormFields } from "../container/StartSessionFormFields";

function StartSessionFormFieldsHarness() {
  const methods = useForm<StartSessionValuesType>({
    resolver: zodResolver(startSessionSchema),
    defaultValues: { minutes: 30 },
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(jest.fn())}>
        <StartSessionFormFields />
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  );
}

describe("StartSessionFormFields", () => {
  it("renders duration field and presets", () => {
    render(<StartSessionFormFieldsHarness />);

    expect(screen.getByLabelText("Duração (minutos)")).toBeInTheDocument();
    expect(screen.getByText("Atalhos rápidos")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "30 min" })).toBeInTheDocument();
  });

  it("shows validation error for invalid duration", async () => {
    const user = userEvent.setup();
    render(<StartSessionFormFieldsHarness />);

    const input = screen.getByLabelText("Duração (minutos)");
    await user.clear(input);
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(await screen.findByText("Informe a duração")).toBeInTheDocument();
  });
});
