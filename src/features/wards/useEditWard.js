import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditWard } from "../../services/apiWards";
import { toast } from "react-hot-toast";

export function useEditWard() {
  const queryClient = useQueryClient();

  const { mutate: editWard, isLoading: isEditing } = useMutation({
    mutationFn: ({ newWardData, id }) => createEditWard(newWardData, id),
    onSuccess: () => {
      toast.success("Ward successfully edited");
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editWard };
}
