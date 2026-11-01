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
  onSubmit = jest.fn(),
}: {
  dateUnlocked?: boolean;
  onToggleDateUnlocked?: () => void;
  onSubmit?: (values: EditSessionValuesType) => void;
}) {
  const methods = useForm<EditSessionValuesType>({
    resolver: zodResolver(editSessionSchema),
    defaultValues: sessionToEditFormValues(sessions[0]!),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
  it("submits notes on Enter", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();

    render(<EditSessionFormHarness onSubmit={onSubmit} />);

    const notes = screen.getByLabelText("Anotações");
    await user.clear(notes);
    await user.type(notes, "Pratiquei escalas{Enter}");

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(
      expect.objectContaining({ notes: "Pratiquei escalas" }),
    );
  });

  it("inserts a line break on Shift+Enter without submitting", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();

    render(<EditSessionFormHarness onSubmit={onSubmit} />);

    const notes = screen.getByLabelText("Anotações");
    await user.clear(notes);
    await user.type(notes, "Escalas{Shift>}{Enter}{/Shift}Acordes");

    expect(notes).toHaveValue("Escalas\nAcordes");
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
