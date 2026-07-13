import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.email("Informe um e-mail válido"),
});

export type ForgotPasswordFormValuesType = z.infer<
  typeof forgotPasswordFormSchema
>;

export const forgotPasswordFormDefaultValues: ForgotPasswordFormValuesType = {
  email: "",
};
