/**
 * @jest-environment node
 */
import { getCurrentUserId, getOptionalCurrentUserId } from "@/lib/auth";

const getCookie = jest.fn();
const verifyFirebaseIdToken = jest.fn();

jest.mock("next/headers", () => ({
  cookies: async () => ({
    get: getCookie,
  }),
}));

jest.mock("@/services/firebase/verify-id-token", () => ({
  verifyFirebaseIdToken: (...args: unknown[]) => verifyFirebaseIdToken(...args),
}));

describe("getCurrentUserId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns verified uid from session cookie", async () => {
    getCookie.mockReturnValue({ value: "token-123" });
    verifyFirebaseIdToken.mockResolvedValue("uid-1");

    await expect(getCurrentUserId()).resolves.toBe("uid-1");
    expect(verifyFirebaseIdToken).toHaveBeenCalledWith("token-123");
  });

  it("throws when cookie is missing", async () => {
    getCookie.mockReturnValue(undefined);

    await expect(getCurrentUserId()).rejects.toThrow("Não autenticado");
  });

  it("returns null from getOptionalCurrentUserId when cookie is missing", async () => {
    getCookie.mockReturnValue(undefined);

    await expect(getOptionalCurrentUserId()).resolves.toBeNull();
  });
});
