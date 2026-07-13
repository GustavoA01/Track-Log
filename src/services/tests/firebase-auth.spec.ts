import { FirebaseError } from "firebase/app";
import {
  getFirebaseAuthErrorMessage,
  loginWithEmail,
  registerWithEmail,
} from "@/services/firebase/email-auth";

const createUserWithEmailAndPassword = jest.fn();
const signInWithEmailAndPassword = jest.fn();
const updateProfile = jest.fn();
const getFirebaseAuth = jest.fn(() => ({ currentUser: null }));

jest.mock("@/services/firebase/config", () => ({
  getFirebaseAuth: () => getFirebaseAuth(),
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: (...args: unknown[]) =>
    createUserWithEmailAndPassword(...args),
  signInWithEmailAndPassword: (...args: unknown[]) =>
    signInWithEmailAndPassword(...args),
  updateProfile: (...args: unknown[]) => updateProfile(...args),
}));

describe("firebase email auth helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("registers a user and updates display name", async () => {
    const user = { uid: "user-1" };
    createUserWithEmailAndPassword.mockResolvedValue({ user });
    updateProfile.mockResolvedValue(undefined);

    const result = await registerWithEmail({
      name: "Ana",
      email: "ana@email.com",
      password: "senha123",
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "ana@email.com",
      "senha123",
    );
    expect(updateProfile).toHaveBeenCalledWith(user, { displayName: "Ana" });
    expect(result).toBe(user);
  });

  it("logs in a user", async () => {
    const user = { uid: "user-1" };
    signInWithEmailAndPassword.mockResolvedValue({ user });

    const result = await loginWithEmail({
      email: "ana@email.com",
      password: "senha123",
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "ana@email.com",
      "senha123",
    );
    expect(result).toBe(user);
  });

  it("maps firebase auth errors", () => {
    expect(
      getFirebaseAuthErrorMessage(
        new FirebaseError("auth/email-already-in-use", "taken"),
      ),
    ).toBe("Este e-mail já está em uso.");

    expect(
      getFirebaseAuthErrorMessage(
        new FirebaseError("auth/invalid-credential", "bad"),
      ),
    ).toBe("E-mail ou senha incorretos.");
  });
});
