import { FirebaseError } from "firebase/app";
import {
  getFirebaseAuthErrorMessage,
  loginWithEmail,
  registerWithEmail,
  sendPasswordReset,
  updateAccount,
} from "@/services/firebase/email-auth";

const createUserWithEmailAndPassword = jest.fn();
const signInWithEmailAndPassword = jest.fn();
const sendPasswordResetEmail = jest.fn();
const updateProfile = jest.fn();
const updateEmail = jest.fn();
const updatePassword = jest.fn();
const reauthenticateWithCredential = jest.fn();
const getIdToken = jest.fn();
const getFirebaseAuth = jest.fn(() => ({
  currentUser: null as null | {
    email: string;
    displayName: string;
    getIdToken: jest.Mock;
  },
}));
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
  sendPasswordResetEmail: (...args: unknown[]) =>
    sendPasswordResetEmail(...args),
  updateProfile: (...args: unknown[]) => updateProfile(...args),
  updateEmail: (...args: unknown[]) => updateEmail(...args),
  updatePassword: (...args: unknown[]) => updatePassword(...args),
  reauthenticateWithCredential: (...args: unknown[]) =>
    reauthenticateWithCredential(...args),
  EmailAuthProvider: {
    credential: (email: string, password: string) => ({ email, password }),
  },
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

  it("sends password reset email", async () => {
    sendPasswordResetEmail.mockResolvedValue(undefined);

    await sendPasswordReset("ana@email.com");

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      expect.anything(),
      "ana@email.com",
    );
  });

  it("swallows user-not-found on password reset", async () => {
    sendPasswordResetEmail.mockRejectedValue(
      new FirebaseError("auth/user-not-found", "missing"),
    );

    await expect(sendPasswordReset("ana@email.com")).resolves.toBeUndefined();
  });

  it("updates account profile and reauthenticates when needed", async () => {
    const user = {
      email: "ana@email.com",
      displayName: "Ana",
      getIdToken,
    };
    getFirebaseAuth.mockReturnValue({ currentUser: user });
    reauthenticateWithCredential.mockResolvedValue(undefined);
    updateProfile.mockResolvedValue(undefined);
    updateEmail.mockResolvedValue(undefined);
    updatePassword.mockResolvedValue(undefined);
    getIdToken.mockResolvedValue("token-456");

    await updateAccount({
      name: "Ana Clara",
      email: "nova@email.com",
      password: "senha456",
      currentPassword: "senha123",
    });

    expect(reauthenticateWithCredential).toHaveBeenCalled();
    expect(updateProfile).toHaveBeenCalledWith(user, {
      displayName: "Ana Clara",
    });
    expect(updateEmail).toHaveBeenCalledWith(user, "nova@email.com");
    expect(updatePassword).toHaveBeenCalledWith(user, "senha456");
    expect(syncAuthSession).toHaveBeenCalledWith("token-456");
  });
});
