import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DataAdminUpdatePasswordSchema } from "../schema";
import { useLocation } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useMutation } from "react-query";
import { patchUpdatePassword } from "@/services/admin";

export type DataAdminUpdatePasswordType = UseFormReturn<
  z.infer<typeof DataAdminUpdatePasswordSchema>
>;

const useUpdatePasswordDataAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { id }: { id: string } = useParams({ strict: false });
  const {
    isError,
    isLoading,
    mutateAsync: patchUpdatePasswordMutation,
  } = useMutation({
    mutationKey: ["patchUpdatePassword", { id: id }],
    mutationFn: (formData: FormData) => patchUpdatePassword(id, formData),
  });
  const form: DataAdminUpdatePasswordType = useForm<
    z.infer<typeof DataAdminUpdatePasswordSchema>
  >({
    resolver: zodResolver(DataAdminUpdatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });
  const onSubmit = async (
    values: z.infer<typeof DataAdminUpdatePasswordSchema>,
  ) => {
    const formData = new FormData();

    formData.append("oldPassword", values.oldPassword);
    formData.append("newPassword", values.newPassword);

    try {
      await patchUpdatePasswordMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-admin" });
  };
  return { form, isLoading, onSubmit };
};

export default useUpdatePasswordDataAdmin;
