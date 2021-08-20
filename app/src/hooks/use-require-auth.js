import { useEffect } from "react";
import { useAuth } from "./use-auth.js";
import { useRouter } from "./use-router.js";

export function useRequireAuth(redirectUrl = "/login") {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.push(redirectUrl);
    }
    //eslint-disable-next-line
  }, [auth, router])

  return auth;
}

