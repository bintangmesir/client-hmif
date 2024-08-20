import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema";
import { postLogin } from "@/services/auth";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "react-query";

export type LoginType = UseFormReturn<z.infer<typeof loginSchema>>;

const useLogin = () => {
  const navigate = useNavigate({ from: "/login" });
  const {
    isError,
    isLoading,
    mutateAsync: postLoginMutation,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: postLogin,
  });

  const form: LoginType = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      await postLoginMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: "/login" });
    }
    navigate({ to: "/dashboard" });
  };
  return { form, isLoading, onSubmit };
};

export default useLogin;
