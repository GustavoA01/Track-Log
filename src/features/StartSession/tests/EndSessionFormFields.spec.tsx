import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  endSessionSchema,
  type EndSessionValuesType,
} from "@/data/schemas/end-session";
import { EndSessionFormFields } from "../container/EndSessionFormFields";

function EndSessionFormFieldsHarness() {
  const methods = useForm<EndSessionValuesType>({
    resolver: zodResolver(endSessionSchema),
    defaultValues: { notes: "" },
  });

  return (
    <FormProvider {...methods}>
      <EndSessionFormFields />
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
});
