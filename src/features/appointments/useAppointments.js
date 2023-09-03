import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAppointments } from "../../services/apiAppointments";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useAppointments() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: appointments, count } = {},
    error,
  } = useQuery({
    queryKey: ["appointments", filter, sortBy, page],
    queryFn: () => getAppointments({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["appointments", filter, sortBy, page + 1],
      queryFn: () => getAppointments({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["appointments", filter, sortBy, page - 1],
      queryFn: () => getAppointments({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, appointments, count };
}
