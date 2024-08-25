import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAdminResetPasswordSchema } from "../schema";
import { useLocation } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useMutation } from "react-query";
import { patchResetPassword } from "@/services/admin";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataAdminResetPasswordType = UseFormReturn<
  z.infer<typeof DataAdminResetPasswordSchema>
>;

const useResetPasswordDataAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { id }: { id: string } = useParams({ strict: false });
  const { isLoading, mutateAsync: patchResetPasswordMutation } = useMutation({
    mutationKey: ["patchResetPassword", { id: id }],
    mutationFn: (formData: FormData) => patchResetPassword(id, formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-admin" });
      }
    },
  });
  const form: DataAdminResetPasswordType = useForm<
    z.infer<typeof DataAdminResetPasswordSchema>
  >({
    resolver: zodResolver(DataAdminResetPasswordSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });
  const onSubmit = async (
    values: z.infer<typeof DataAdminResetPasswordSchema>,
  ) => {
    const formData = new FormData();
    formData.append("password", values.password);
    try {
      await patchResetPasswordMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit };
};

export default useResetPasswordDataAdmin;
