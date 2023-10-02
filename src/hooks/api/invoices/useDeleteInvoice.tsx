import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";

function useDeleteInvoice(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation((requestBody) => {
    return api.delete(`/invoice/${requestBody?.publicId}`, requestBody);
  }, options);
}

export default useDeleteInvoice;
