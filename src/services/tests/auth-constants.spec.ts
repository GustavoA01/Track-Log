/**
 * @jest-environment node
 */
import {
  isAuthGuestOnlyPath,
  isAuthPublicPath,
} from "@/services/firebase/auth-constants";

describe("auth path helpers", () => {
  it("marks home as public without exposing other routes", () => {
    expect(isAuthPublicPath("/")).toBe(true);
    expect(isAuthPublicPath("/login")).toBe(true);
    expect(isAuthPublicPath("/cadastrar")).toBe(true);
    expect(isAuthPublicPath("/historico")).toBe(false);
    expect(isAuthPublicPath("/musica/nova")).toBe(false);
  });

  it("marks only auth forms as guest-only", () => {
    expect(isAuthGuestOnlyPath("/login")).toBe(true);
    expect(isAuthGuestOnlyPath("/cadastrar")).toBe(true);
    expect(isAuthGuestOnlyPath("/")).toBe(false);
    expect(isAuthGuestOnlyPath("/historico")).toBe(false);
  });
});
