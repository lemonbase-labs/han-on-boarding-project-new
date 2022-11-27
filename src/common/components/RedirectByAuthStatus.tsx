import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RedirectByAuthStatus = () => {
  const {
    location: { pathname },
    push,
  } = useHistory();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn && pathname === "/") {
      push("/review");
    }
    if (!isLoggedIn && pathname !== "/") {
      push("/");
    }
  }, [pathname, isLoggedIn]);

  return <></>;
};
