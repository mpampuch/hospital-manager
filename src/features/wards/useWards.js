import { useQuery } from "@tanstack/react-query";
import { getWards } from "../../services/apiWards";

export function useWards() {
  const {
    isLoading,
    data: wards,
    error,
  } = useQuery({
    queryKey: ["wards"],
    queryFn: getWards,
  });

  return { isLoading, error, wards };
}
