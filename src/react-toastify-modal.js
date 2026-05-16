// react query hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;

// modal confirm
function handleConfirmDelete(id) {
  toast((t) => (
    <ToasterContainer>
      <ToasterSpan>Are you sure?</ToasterSpan>
      <ToasterButtonContainer>
        <ToasterButton vari="no" onClick={() => toast.dismiss(t.id)}>
          No
        </ToasterButton>

        <ToasterButton
          vari="yes"
          onClick={() => {
            toast.dismiss(t.id);
            deleteCabin(id);
          }}
        >
          Yes
        </ToasterButton>
      </ToasterButtonContainer>
    </ToasterContainer>
  ));
}

{
  <button disabled={isDeleting} onClick={() => handleConfirmDelete(cabinId)}>
    <HiTrash />
  </button>;
}
