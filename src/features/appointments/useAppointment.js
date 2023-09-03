import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAppointment } from "../../services/apiAppointments";

export function useAppointment() {
  const { appointmentId } = useParams();

  const {
    isLoading,
    data: appointment,
    error,
  } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointment(appointmentId),
    retry: false,
  });

  return { isLoading, error, appointment };
}
