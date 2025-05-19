import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const cookies = new Cookies(null, { path: "/" });

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const access_token = cookies.get("access_token");

  if (access_token) {
    return <Navigate to={"/dashboard"} />;
  }

  return children;
};

export default AuthRoute;
