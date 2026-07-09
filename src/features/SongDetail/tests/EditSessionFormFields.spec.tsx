import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import {
  editSessionSchema,
  sessionToEditFormValues,
  type EditSessionValuesType,
} from "@/data/schemas/edit-session";
import { EditSessionFormFields } from "../components/EditSessionFormFields";
import { sessions } from "./test-data";

function EditSessionFormHarness({
  dateUnlocked = false,
  onToggleDateUnlocked = jest.fn(),
}: {
  dateUnlocked?: boolean;
  onToggleDateUnlocked?: () => void;
}) {
  const methods = useForm<EditSessionValuesType>({
    resolver: zodResolver(editSessionSchema),
    defaultValues: sessionToEditFormValues(sessions[0]!),
  });

  return (
    <FormProvider {...methods}>
      <form>
        <EditSessionFormFields
          dateUnlocked={dateUnlocked}
          onToggleDateUnlocked={onToggleDateUnlocked}
        />
      </form>
    </FormProvider>
  );
}

describe("EditSessionFormFields", () => {
  it("renders date field disabled by default with lock button", () => {
    render(<EditSessionFormHarness />);

    expect(screen.getByLabelText("Data")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Desbloquear data" }),
    ).toBeInTheDocument();
  });

  it("enables date field when unlocked", () => {
    render(<EditSessionFormHarness dateUnlocked />);

    expect(screen.getByLabelText("Data")).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "Bloquear data" }),
    ).toBeInTheDocument();
  });

  it("calls onToggleDateUnlocked from lock button", async () => {
    const onToggleDateUnlocked = jest.fn();
    const user = userEvent.setup();

    render(
      <EditSessionFormHarness onToggleDateUnlocked={onToggleDateUnlocked} />,
    );

    await user.click(screen.getByRole("button", { name: "Desbloquear data" }));

    expect(onToggleDateUnlocked).toHaveBeenCalledTimes(1);
  });

  it("renders minutes and notes fields", () => {
    render(<EditSessionFormHarness />);

    expect(screen.getByLabelText("Duração (min)")).toBeInTheDocument();
    expect(screen.getByLabelText("Anotações")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Trabalhei acordes")).toBeInTheDocument();
  });
});
