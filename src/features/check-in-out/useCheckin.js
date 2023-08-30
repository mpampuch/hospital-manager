import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin({ redirect }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ appointmentId, consultation }) => {
      return updateBooking(appointmentId, {
        status: "admitted",
        isPaid: true,
        ...consultation,
      });
    },

    onSuccess: (data) => {
      toast.success(`${data.patients.fullName} successfully admitted`);
      queryClient.invalidateQueries({ active: true });
      if (!redirect) redirect = "/";
      navigate(redirect);
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
