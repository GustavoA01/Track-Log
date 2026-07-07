import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  songFormDefaultValues,
  songFormSchema,
  type SongFormValuesType,
} from "@/data/schemas/song-form";
import { StatusSelect } from "../components/StatusSelect";

function StatusSelectHarness({
  defaultValues = songFormDefaultValues,
}: {
  defaultValues?: SongFormValuesType;
}) {
  const methods = useForm<SongFormValuesType>({
    resolver: zodResolver(songFormSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <StatusSelect control={methods.control} />
    </FormProvider>
  );
}

describe("StatusSelect", () => {
  it("renders current status label", () => {
    render(
      <StatusSelectHarness
        defaultValues={{ ...songFormDefaultValues, status: "learning" }}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("Aprendendo");
  });

  it("lists all status options", async () => {
    const user = userEvent.setup();

    render(<StatusSelectHarness />);

    await user.click(screen.getByRole("combobox"));

    expect(
      await screen.findByRole("option", { name: "Aprendendo" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Quero aprender" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Aprendida" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pausada" })).toBeInTheDocument();
  });
});
