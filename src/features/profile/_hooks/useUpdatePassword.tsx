import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema } from "../schema";
import { patchUpdatePassword } from "@/services/profile";
import { useMutation } from "react-query";
import { useNavigate } from "@tanstack/react-router";

export type UpdatePasswordType = UseFormReturn<
  z.infer<typeof UpdatePasswordSchema>
>;

const useUpdatePassword = () => {
  const navigate = useNavigate({ from: "/profile" });
  const {
    isError,
    isLoading,
    mutateAsync: patchUpdatePasswordMutation,
  } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: patchUpdatePassword,
  });

  const form: UpdatePasswordType = useForm<
    z.infer<typeof UpdatePasswordSchema>
  >({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    const formData = new FormData();

    formData.append("oldPassword", values.oldPassword);
    formData.append("newPassword", values.newPassword);

    try {
      await patchUpdatePasswordMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: "/profile" });
    }

    navigate({ to: "/profile" });
  };

  return { form, isLoading, onSubmit };
};

export default useUpdatePassword;
