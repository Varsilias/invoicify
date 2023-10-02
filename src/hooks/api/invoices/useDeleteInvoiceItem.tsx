import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";

function useDeleteInvoiceItem(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation((requestBody) => {
    return api.delete(
      `/invoice/${requestBody?.publicId}/item/${requestBody?.itemPublicId}`,
      requestBody,
    );
  }, options);
}

export default useDeleteInvoiceItem;
