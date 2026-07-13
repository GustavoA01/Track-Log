import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
} from "firebase/auth";
import type { LoginFormValuesType } from "@/data/schemas/login-form";
import type { RegisterFormValuesType } from "@/data/schemas/register-form";
import { getFirebaseAuth } from "./config";

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

  return credential.user;
};

export const loginWithEmail = async ({
  email,
  password,
}: LoginFormValuesType): Promise<User> => {
  const auth = getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const getFirebaseAuthErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError) {
    const message =
      authErrorMessages[error.code as keyof typeof authErrorMessages];
    return message ?? error.message;
  } else if (error instanceof Error) return error.message;
  else return "Não foi possível autenticar. Tente novamente.";
};
