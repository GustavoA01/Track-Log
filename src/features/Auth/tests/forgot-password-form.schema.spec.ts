import { forgotPasswordFormSchema } from "@/data/schemas/forgot-password-form";

describe("forgotPasswordFormSchema", () => {
  it("accepts a valid email", () => {
    const result = forgotPasswordFormSchema.safeParse({
      email: "ana@email.com",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = forgotPasswordFormSchema.safeParse({
      email: "ana",
    });

    expect(result.success).toBe(false);
  });
});
