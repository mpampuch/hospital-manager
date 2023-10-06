import { useQuery } from "@tanstack/react-query";
import { getResetDate } from "../../services/apiResetDate";

export function useResetDate() {
  const {
    isLoading,
    error,
    data: resetdate,
  } = useQuery({
    queryKey: ["resetdate"],
    queryFn: getResetDate,
  });

  return { isLoading, error, resetdate };
}
