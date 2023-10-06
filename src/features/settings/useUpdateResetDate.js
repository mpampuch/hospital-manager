import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResetDate as updateResetDateApi } from "../../services/apiResetDate";

export function useUpdateResetDate() {
  const queryClient = useQueryClient();

  const { mutate: updateResetDate, isLoading: isUpdating } = useMutation({
    mutationFn: updateResetDateApi,
    onSuccess: () => {
      console.log("Reset date successfully edited");
      queryClient.invalidateQueries({ queryKey: ["resetdate"] });
    },
    onError: (err) => console.log(err.message),
  });

  return { isUpdating, updateResetDate };
}
