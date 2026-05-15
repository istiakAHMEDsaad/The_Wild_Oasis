import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success("Please verify new account from use's email address.");
    },
  });

  return { signup, isLoading };
}

export default useSignup;
