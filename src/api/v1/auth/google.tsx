import { api } from "@/api_config/config";

export const googleLogin = (data) => api.post("/api/v1/auth/google", data);
