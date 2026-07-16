import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  type User,
} from "firebase/auth";
import type { EditAccountFormValuesType } from "@/data/schemas/register-form";
import type { LoginFormValuesType } from "@/data/schemas/login-form";
import type { RegisterFormValuesType } from "@/data/schemas/register-form";
import { getFirebaseAuth } from "./config";
import { syncAuthSession } from "./session";
import { authErrorMessages } from "@/data/constants";

export const registerWithEmail = async ({
  name,
  email,
  password,
}: Pick<
  RegisterFormValuesType,
  "name" | "email" | "password"
>): Promise<User> => {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(credential.user, { displayName: name });
  const token = await credential.user.getIdToken();
  await syncAuthSession(token);

  return credential.user;
};

export const loginWithEmail = async ({
  email,
  password,
}: LoginFormValuesType): Promise<User> => {
  const auth = getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const token = await credential.user.getIdToken();
  await syncAuthSession(token);
  return credential.user;
};

export const logout = async () => {
  const auth = getFirebaseAuth();
  await signOut(auth);
  await syncAuthSession(null);
};

export const sendPasswordReset = async (email: string) => {
  const auth = getFirebaseAuth();

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const userNotFound =
      error instanceof FirebaseError && error.code === "auth/user-not-found";
    if (userNotFound) return;
    throw error;
  }
};

export const updateAccount = async ({
  name,
  email,
  password,
  currentPassword,
}: EditAccountFormValuesType): Promise<User> => {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;

  if (!user?.email) throw new Error("Não autenticado");

  const emailChanged = email !== user.email;
  const passwordChanged = password.length > 0;
  const needsReauth = emailChanged || passwordChanged;
  const isNameChanged = name !== (user.displayName ?? "");

  if (needsReauth) {
    if (!currentPassword) {
      throw new Error("Informe a senha atual para alterar e-mail ou senha.");
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    await reauthenticateWithCredential(user, credential);
  }

  if (isNameChanged) await updateProfile(user, { displayName: name });
  if (emailChanged) await updateEmail(user, email);
  if (passwordChanged) await updatePassword(user, password);

  const token = await user.getIdToken(true);
  await syncAuthSession(token);

  return user;
};

export const getFirebaseAuthErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError) {
    const message =
      authErrorMessages[error.code as keyof typeof authErrorMessages];
    return message ?? error.message;
  } else if (error instanceof Error) return error.message;
  else return "Não foi possível autenticar. Tente novamente.";
};
