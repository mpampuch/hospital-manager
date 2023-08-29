import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: wards,
    error,
  } = useQuery({
    queryKey: ["wards"],
    queryFn: getCabins,
  });

  return { isLoading, error, wards };
}
