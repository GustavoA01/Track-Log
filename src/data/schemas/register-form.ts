import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  currentPassword: z.string().optional(),
});

export const editAccountFormSchema = z
  .object({
    name: z.string().trim().min(1, "Nome é obrigatório"),
    email: z.email("Informe um e-mail válido"),
    password: z.string(),
    currentPassword: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.password.length > 0 && values.password.length < 6) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "A senha deve ter pelo menos 6 caracteres",
      });
    }
  });

export type RegisterFormValuesType = z.infer<typeof registerFormSchema>;
export type EditAccountFormValuesType = z.infer<typeof editAccountFormSchema>;
export type AccountFormValuesType = EditAccountFormValuesType;

export const registerFormDefaultValues: AccountFormValuesType = {
  name: "",
  email: "",
  password: "",
  currentPassword: "",
};
