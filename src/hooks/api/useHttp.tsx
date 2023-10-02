import axios, { AxiosInstance } from "axios";
import { useAuthContext } from "../../context";
import { toast } from "react-toastify";
import { Toast } from "../../components/general/toast/Toast";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../../utils";

export default function useHttp(
  headers?: Record<string, string>,
): AxiosInstance {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status: number = error?.response?.status;

      if (status !== 401) {
        return error;
      }
      toast(<Toast type="error">{"Session Expired, Login again"}</Toast>);
      setToken("");
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      return navigate(`/auth/login`);
    },
  );

  return instance;
}
