import { z } from "zod";

export const endSessionSchema = z.object({
  notes: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .transform((value) => value.trim()),
});

export type EndSessionValuesType = z.infer<typeof endSessionSchema>;
