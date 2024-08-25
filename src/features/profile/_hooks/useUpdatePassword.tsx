import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema } from "../schema";
import { patchUpdatePassword } from "@/services/profile";
import { useMutation } from "react-query";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type UpdatePasswordType = UseFormReturn<
  z.infer<typeof UpdatePasswordSchema>
>;

const useUpdatePassword = () => {
  const { setFlashMessage } = useFlashMessageContext();
  const { isLoading, mutateAsync: patchUpdatePasswordMutation } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: patchUpdatePassword,
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        setFlashMessage({
          title: "SUCCESS",
          description: item.message,
          status: item.status,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
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
  };

  return { form, isLoading, onSubmit };
};

export default useUpdatePassword;
