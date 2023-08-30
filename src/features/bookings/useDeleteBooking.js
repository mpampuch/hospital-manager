import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAppointment } = useMutation({
    mutationFn: deleteBookingApi,
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
