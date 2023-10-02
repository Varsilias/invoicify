import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";

function useCreateInvoice(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation((requestBody) => {
    return api.post(`/invoice`, requestBody);
  }, options);
}
export default useCreateInvoice;
