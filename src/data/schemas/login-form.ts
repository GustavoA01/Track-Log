import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormValuesType = z.infer<typeof loginFormSchema>;

export const loginFormDefaultValues: LoginFormValuesType = {
  email: "",
  password: "",
};
