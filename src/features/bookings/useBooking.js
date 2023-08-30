import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { appointmentId } = useParams();

  const {
    isLoading,
    data: appointment,
    error,
  } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getBooking(appointmentId),
    retry: false,
  });

  return { isLoading, error, appointment };
}
