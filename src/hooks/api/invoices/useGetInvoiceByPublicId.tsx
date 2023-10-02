import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";

export function useGetInvoiceByPublicId(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation((requestBody) => {
    return api.get(`/invoice/${requestBody?.publicId}`, requestBody);
  }, options);
}

export default useGetInvoiceByPublicId;
