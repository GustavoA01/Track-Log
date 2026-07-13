import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import type { LoginFormValuesType } from "@/data/schemas/login-form";
import type { RegisterFormValuesType } from "@/data/schemas/register-form";
import { getFirebaseAuth } from "./config";
import { syncAuthSession } from "./session";

const authErrorMessages = {
  "auth/email-already-in-use": "Este e-mail já está em uso.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/weak-password": "A senha é muito fraca.",
  "auth/too-many-requests":
    "Muitas tentativas. Aguarde um momento e tente novamente.",
};

export const registerWithEmail = async ({
  name,
  email,
  password,
}: RegisterFormValuesType): Promise<User> => {
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

export const getFirebaseAuthErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError) {
    const message =
      authErrorMessages[error.code as keyof typeof authErrorMessages];
    return message ?? error.message;
  } else if (error instanceof Error) return error.message;
  else return "Não foi possível autenticar. Tente novamente.";
};
