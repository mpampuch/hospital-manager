import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newWardData, id }) => {
      createEditCabin(newWardData, id);
    },
    onSuccess: () => {
      toast.success("Ward successfully edited");
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
