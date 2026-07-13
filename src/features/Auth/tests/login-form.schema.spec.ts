import { loginFormSchema } from "@/data/schemas/login-form";

describe("loginFormSchema", () => {
  it("accepts valid login data", () => {
    const result = loginFormSchema.safeParse({
      email: "ana@email.com",
      password: "senha123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty password", () => {
    const result = loginFormSchema.safeParse({
      email: "ana@email.com",
      password: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = loginFormSchema.safeParse({
      email: "ana",
      password: "senha123",
    });

    expect(result.success).toBe(false);
  });
});
