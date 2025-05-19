import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <GoogleOAuthProvider clientId="1090449639832-jbbrfps3adampms60qqgbefrqc56e7ni.apps.googleusercontent.com">
          <Outlet />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default AuthLayout;
