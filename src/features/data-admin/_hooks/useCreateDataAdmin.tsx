import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAdminCreateSchema } from "../schema";
import { useMutation } from "react-query";
import { postAdmin } from "@/services/admin";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type DataAdminCreateType = UseFormReturn<
  z.infer<typeof DataAdminCreateSchema>
>;

const useCreateDataAdmin = () => {
  const location = useLocation();
  const { setFlashMessage } = useFlashMessageContext();
  const navigate = useNavigate({ from: location.pathname });
  const { isLoading, mutateAsync: postAdminMutation } = useMutation({
    mutationKey: ["postAdmin"],
    mutationFn: (formData: FormData) => postAdmin(formData),
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
  const form: DataAdminCreateType = useForm<
    z.infer<typeof DataAdminCreateSchema>
  >({
    resolver: zodResolver(DataAdminCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof DataAdminCreateSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role);
    if (values.fotoProfile) {
      for (let i = 0; i < values.fotoProfile.length; i++) {
        formData.append("fotoProfile", values.fotoProfile[i]);
      }
    }

    try {
      await postAdminMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataAdmin;
