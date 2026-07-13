import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type RegisterFormValuesType = z.infer<typeof registerFormSchema>;

export const registerFormDefaultValues: RegisterFormValuesType = {
  name: "",
  email: "",
  password: "",
};
