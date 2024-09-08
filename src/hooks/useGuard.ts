"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export const useGuard = () => {
  const [auth, setAuth] = useState<any>();
  const router = useRouter();
  const pathname = usePathname()
  const currentAuth = getCookie("currentUser");

  useEffect(() => {
    if (currentAuth) {
      setAuth(JSON.parse(currentAuth));
    }
    else{
      router.replace('/login');
    }
  }, [currentAuth, router, pathname])

  return auth;
};
