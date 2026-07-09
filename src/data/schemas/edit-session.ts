import { z } from "zod";
import type { PracticeSessionType } from "@/data/types";

const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida");

export const editSessionSchema = z.object({
  minutes: z
    .number({ error: "Informe a duração" })
    .refine((value) => !Number.isNaN(value), {
      message: "Informe a duração",
    })
    .int("Use minutos inteiros")
    .min(1, "Mínimo 1 minuto")
    .max(180, "Máximo 180 minutos"),
  notes: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .transform((value) => value.trim()),
  date: dateOnly,
});

export type EditSessionValuesType = z.infer<typeof editSessionSchema>;

export const editSessionDefaultValues: EditSessionValuesType = {
  minutes: 30,
  notes: "",
  date: "",
};

export const sessionToEditFormValues = (
  session: Pick<PracticeSessionType, "minutes" | "notes" | "date">,
): EditSessionValuesType => ({
  minutes: session.minutes,
  notes: session.notes,
  date: session.date,
});

export type UpdateSessionInput = {
  minutes: number;
  notes: string;
  date?: string;
};
