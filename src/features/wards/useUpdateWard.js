import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEditWard } from "../../services/apiWards";
import { toast } from "react-hot-toast";

export function useUpdateWard() {
  const queryClient = useQueryClient();

  const { mutate: updateWard, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newWardData, id }) => createEditWard(newWardData, id),
    onSuccess: () => {
      toast.success("Ward successfully updated");
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateWard };
}
