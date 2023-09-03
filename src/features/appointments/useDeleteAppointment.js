import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteAppointment as deleteAppointmentApi } from "../../services/apiAppointments";

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAppointment } = useMutation({
    mutationFn: deleteAppointmentApi,
    onSuccess: () => {
      toast.success("Appointment successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAppointment };
}
