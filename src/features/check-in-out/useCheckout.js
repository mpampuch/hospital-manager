import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../../services/apiAppointments";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (appointmentId) =>
      updateAppointment(appointmentId, {
        status: "discharged",
      }),

    onSuccess: (data) => {
      toast.success(`${data.patients.fullName} successfully discharged`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
