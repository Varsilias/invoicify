import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";

function useSignup(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation(
    (requestBody) => api.post("/auth/sign_up", requestBody),
    options,
  );
}

export default useSignup;
