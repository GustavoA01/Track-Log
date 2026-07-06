import { z } from "zod";

export const createSessionSchema = z.object({
  songId: z.string().min(1),
  minutes: z
    .number()
    .int("Use minutos inteiros")
    .min(1, "Mínimo 1 minuto")
    .max(180, "Máximo 180 minutos"),
  notes: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .transform((value) => value.trim()),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
