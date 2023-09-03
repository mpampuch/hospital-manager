import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditWard } from "../../services/apiWards";

export function useCreateWard() {
  const queryClient = useQueryClient();

  const { mutate: createWard, isLoading: isCreating } = useMutation({
    mutationFn: createEditWard,
    onSuccess: () => {
      toast.success("New ward successfully created");
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createWard };
}
