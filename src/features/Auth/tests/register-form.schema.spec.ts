import {
  editAccountFormSchema,
  registerFormSchema,
} from "@/data/schemas/register-form";

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

describe("editAccountFormSchema", () => {
  it("allows empty password to keep the current one", () => {
    const result = editAccountFormSchema.safeParse({
      name: "Ana",
      email: "ana@email.com",
      password: "",
      currentPassword: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects short new passwords", () => {
    const result = editAccountFormSchema.safeParse({
      name: "Ana",
      email: "ana@email.com",
      password: "123",
      currentPassword: "senha123",
    });

    expect(result.success).toBe(false);
  });
});
