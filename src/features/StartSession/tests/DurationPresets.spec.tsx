import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  startSessionSchema,
  type StartSessionValuesType,
} from "@/data/schemas/start-session";
import { DurationPresets } from "../container/DurationPresets";

function DurationPresetsHarness({
  defaultValues = { minutes: 30 },
}: {
  defaultValues?: StartSessionValuesType;
}) {
  const methods = useForm<StartSessionValuesType>({
    resolver: zodResolver(startSessionSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <DurationPresets />
      <output data-testid="minutes">{methods.watch("minutes")}</output>
    </FormProvider>
  );
}

describe("DurationPresets", () => {
  it("renders preset buttons", () => {
    render(<DurationPresetsHarness />);

    expect(screen.getByRole("button", { name: "5 min" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "60 min" })).toBeInTheDocument();
  });

  it("updates minutes when preset is clicked", async () => {
    const user = userEvent.setup();
    render(<DurationPresetsHarness />);

    await user.click(screen.getByRole("button", { name: "15 min" }));

    expect(screen.getByTestId("minutes")).toHaveTextContent("15");
  });
});
