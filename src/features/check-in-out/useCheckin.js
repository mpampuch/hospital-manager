import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ appointmentId, consultation }) => {
      console.log("appointmentId", appointmentId);
      console.log("consultation", consultation);

      return updateBooking(appointmentId, {
        status: "admitted",
        isPaid: true,
        ...consultation,
      });
      console.log("appointment updated");
    },

    onSuccess: (data) => {
      console.log("data", data);
      toast.success(`Appointment #${data.id} successfully admitted`);
      queryClient.invalidateQueries({ active: true });
      navigate("/appointments");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
