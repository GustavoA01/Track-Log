import { registerFormSchema } from "@/data/schemas/register-form";

describe("registerFormSchema", () => {
  it("accepts valid registration data", () => {
    const result = registerFormSchema.safeParse({
      name: "Ana",
      email: "ana@email.com",
      password: "senha123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects short passwords", () => {
    const result = registerFormSchema.safeParse({
      name: "Ana",
      email: "ana@email.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});
