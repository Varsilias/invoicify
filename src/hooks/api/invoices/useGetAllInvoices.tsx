import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import useHttp from "../useHttp";
import { getQueryStringParams } from "../../../utils";

export function useGetAllInvoices(
  options?: UseMutationOptions<any, unknown, any, unknown>,
): UseMutationResult<unknown, unknown, any, unknown> {
  const api = useHttp();

  return useMutation((requestBody) => {
    let queryString;

    if (requestBody?.status !== "All") {
      queryString = {
        status: requestBody?.status,
      };
    } else {
      queryString = {};
    }
    const queryParams = getQueryStringParams(queryString);

    return api.get(`/invoice?${queryParams}`, requestBody);
  }, options);
}
