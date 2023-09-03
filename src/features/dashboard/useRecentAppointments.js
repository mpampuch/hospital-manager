import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getAppointmentsAfterDate } from "../../services/apiAppointments";

export function useRecentAppointments() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 30
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: appointments } = useQuery({
    queryFn: () => getAppointmentsAfterDate(queryDate),
    queryKey: ["appointments", `last-${numDays}`],
  });

  return { isLoading, appointments };
}
