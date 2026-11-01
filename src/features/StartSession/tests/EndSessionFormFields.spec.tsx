import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FormEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  endSessionSchema,
  type EndSessionValuesType,
} from "@/data/schemas/end-session";
import { EndSessionFormFields } from "../container/EndSessionFormFields";

function EndSessionFormFieldsHarness({
  onSubmit = jest.fn(),
}: {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const methods = useForm<EndSessionValuesType>({
    resolver: zodResolver(endSessionSchema),
    defaultValues: { notes: "" },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <EndSessionFormFields />
      </form>
    </FormProvider>
  );
}

describe("EndSessionFormFields", () => {
  it("renders notes field", () => {
    render(<EndSessionFormFieldsHarness />);

    expect(screen.getByLabelText("O que você praticou?")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/trabalhei a transição/i),
    ).toBeInTheDocument();
  });

  it("submits the form on Enter without Shift", async () => {
    const onSubmit = jest.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    const user = userEvent.setup();

    render(<EndSessionFormFieldsHarness onSubmit={onSubmit} />);

    await user.type(
      screen.getByLabelText("O que você praticou?"),
      "Trabalhei o refrão{Enter}",
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not submit the form on Shift+Enter", async () => {
    const onSubmit = jest.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    const user = userEvent.setup();

    render(<EndSessionFormFieldsHarness onSubmit={onSubmit} />);

    await user.type(
      screen.getByLabelText("O que você praticou?"),
      "Trabalhei o refrão{Shift>}{Enter}{/Shift}",
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
