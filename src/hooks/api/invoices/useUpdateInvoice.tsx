import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";

export function useUpdateInvoice(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation((requestBody) => {
    return api.put(`/invoice/${requestBody?.publicId}`, requestBody);
  }, options);
}

export default useUpdateInvoice;
