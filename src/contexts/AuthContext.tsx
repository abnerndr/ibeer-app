import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { Notify } from "@/components/common/Notify/Notify";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebase";

type AuthContextType = {
  user: any;
  signIn: () => Promise<void>;
  signUp: () => Promise<void>;
  signInWithGoogle: any;
  signInWithGithub: any;
  signOut: any;
};

export const AuthContext = createContext({});
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<string>();
  const [token, setToken] = useState<string>();
  const [providerId, setProviderId] = useState<string>();

  useEffect(() => {
    async function loadUserFromCookies() {
      const {
        ["ibeer.token"]: token,
        ["ibeer.user"]: user,
        ["ibeer.provider_id"]: providerId,
      } = parseCookies();
      if (typeof window !== "undefined") {
        setToken(token);
        setUser(user);
        setProviderId(providerId);
      }
    }
    loadUserFromCookies();
  }, []);

  async function signIn({ email, password }: any) {
    const authentication = auth;
    signInWithEmailAndPassword(authentication, email, password)
      .then((response: any) => {
        setCookie(null, "ibeer.token", response._tokenResponse.refreshToken, {
          maxAge: 60 * 60 * 1 * 24 * 30, //30 days
          path: "/",
        });

        setCookie(null, "ibeer.user", JSON.stringify(response.user), {
          maxAge: 60 * 60 * 1 * 24 * 30, //30 days
          path: "/",
        });

        setCookie(null, "ibeer.provider_id", response.providerId, {
          maxAge: 60 * 60 * 1 * 24 * 30, //30 days
          path: "/",
        });
        const infoUser = response.user;
        Notify({
          type: "success",
          message: `bem vindo! ${infoUser.displayName || infoUser.email}`,
        });
        Router.push("/private/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode) {
          Notify({ type: "error", message: "usuario ou senha inválidas" });
        }
        if (!errorCode) {
          Notify({ type: "error", message: "falha ao tentar logar" });
        }
      });
  }

  async function signInWithGoogle() {
    const authentication = auth;
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((result: any) => {
        setCookie(null, "ibeer.token", result._tokenResponse.refreshToken, {
          maxAge: 60 * 60 * 1 * 24 * 30, //30 days
          path: "/",
        });

        setCookie(null, "ibeer.user", JSON.stringify(result.user), {
          maxAge: 60 * 60 * 1 * 24 * 30, //30 days
          path: "/",
        });

        setCookie(null, "ibeer.provider_id", result.providerId, {
          maxAge: 60 * 60 * 1 * 24 * 30, //30 days
          path: "/",
        });
        const infoUser = result.user;
        Notify({
          type: "google",
          message: `bem vindo! ${infoUser.displayName || infoUser.email}`,
        });
        Router.push("/private/home");
      })
      .catch((error) => {
        Notify({
          type: "error",
          message: "falha ao tentar logar com o google",
        });
      });
  }

  async function signUp({ email, password }: any) {
    const authentication = auth;
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        Notify({ type: "success", message: "conta criada com exito" });
        Router.push("/public/authentication/login");
      })
      .catch((error) => {
        Notify({ type: "error", message: "falha ao criar a conta" });
      });
  }

  async function signOut() {
    const authentication = auth;
    authentication
      .signOut()
      .then(() => {
        destroyCookie({}, "ibeer.token");
        destroyCookie({}, "ibeer.user");
        destroyCookie({}, "ibeer.provider_id");
        Notify({ type: "info", message: "você se desconectou da sua conta" });
        Router.push("/public/authentication/login");
      })
      .catch((error) => {
        Notify({ type: "error", message: "falha ao tentar deslogar" });
        console.log(error);
      });
  }

  async function updateName({ displayName, photoUrl, phoneNumber }: any) {
    const authentication = auth;
    authentication
      .updateCurrentUser(displayName)
      .then(function () {
        //Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}
