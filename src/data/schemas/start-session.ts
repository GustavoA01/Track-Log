import { z } from "zod";

export const startSessionSchema = z.object({
  minutes: z
    .number({ error: "Informe a duração" })
    .refine((value) => !Number.isNaN(value), { message: "Informe a duração" })
    .int("Use minutos inteiros")
    .min(1, "Mínimo 1 minuto")
    .max(180, "Máximo 180 minutos"),
});

export type StartSessionValuesType = z.infer<typeof startSessionSchema>;
