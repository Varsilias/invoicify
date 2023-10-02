import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";

export function useGetProfileDetails(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation((requestBody) => {
    return api.get(`/auth/get_info`, requestBody);
  }, options);
}

export default useGetProfileDetails;
