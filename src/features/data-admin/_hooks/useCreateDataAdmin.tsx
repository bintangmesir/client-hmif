import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataAdminCreateSchema } from "../schema";
import { useMutation } from "react-query";
import { postAdmin } from "@/services/admin";
import { useLocation, useNavigate } from "@tanstack/react-router";

export type DataAdminCreateType = UseFormReturn<
  z.infer<typeof DataAdminCreateSchema>
>;

const useCreateDataAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const {
    isError,
    isLoading,
    mutateAsync: postAdminMutation,
  } = useMutation({
    mutationKey: ["postAdmin"],
    mutationFn: (formData: FormData) => postAdmin(formData),
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
      fotoProfile: null,
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

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-admin" });
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataAdmin;
