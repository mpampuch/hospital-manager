import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteWard as deleteWardApi } from "../../services/apiWards";

export function useDeleteWard() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteWard } = useMutation({
    mutationFn: deleteWardApi,
    onSuccess: () => {
      toast.success("Ward successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["wards"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteWard };
}
