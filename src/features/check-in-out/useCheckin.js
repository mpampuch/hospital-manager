import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../../services/apiAppointments";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin({ redirect }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ appointmentId, consultation }) => {
      return updateAppointment(appointmentId, {
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
