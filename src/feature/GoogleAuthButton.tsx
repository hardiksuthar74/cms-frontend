import { googleLogin } from "@/api/v1/auth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

interface JwtPayload {
  id_token: string;
}
const cookies = new Cookies(null, { path: "/" });

const GoogleAuthButton = () => {
  const { mutate } = useMutation({
    mutationFn: googleLogin,
    onSuccess: ({ data }) => {
      toast.success("Welcome user!");
      cookies.set("access_token", data.access_token);
      cookies.set("refresh_token", data.refresh_token);
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.error("Login failed:", error);
    },
  });

  const handleLoginSuccess = async (credentialResponse: any) => {
    const { credential } = credentialResponse;

    // OPTIONAL: decode token to get user info
    const decoded: JwtPayload = jwtDecode(credential);
    console.log("Decoded JWT:", decoded);

    const userData = {
      id_token: credential,
    };

    mutate(userData);
  };
  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleAuthButton;
