import { FirebaseError } from "firebase/app";
import {
  getFirebaseAuthErrorMessage,
  loginWithEmail,
  registerWithEmail,
} from "@/services/firebase/email-auth";

const createUserWithEmailAndPassword = jest.fn();
const signInWithEmailAndPassword = jest.fn();
const updateProfile = jest.fn();
const getIdToken = jest.fn();
const getFirebaseAuth = jest.fn(() => ({ currentUser: null }));
const syncAuthSession = jest.fn();

jest.mock("@/services/firebase/config", () => ({
  getFirebaseAuth: () => getFirebaseAuth(),
}));

jest.mock("@/services/firebase/session", () => ({
  syncAuthSession: (...args: unknown[]) => syncAuthSession(...args),
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: (...args: unknown[]) =>
    createUserWithEmailAndPassword(...args),
  signInWithEmailAndPassword: (...args: unknown[]) =>
    signInWithEmailAndPassword(...args),
  updateProfile: (...args: unknown[]) => updateProfile(...args),
  signOut: jest.fn(),
}));

describe("firebase email auth helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getIdToken.mockResolvedValue("token-123");
    syncAuthSession.mockResolvedValue(undefined);
  });

  it("registers a user, updates display name and syncs session", async () => {
    const user = { uid: "user-1", getIdToken };
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
    expect(syncAuthSession).toHaveBeenCalledWith("token-123");
    expect(result).toBe(user);
  });

  it("logs in a user and syncs session", async () => {
    const user = { uid: "user-1", getIdToken };
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
    expect(syncAuthSession).toHaveBeenCalledWith("token-123");
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
