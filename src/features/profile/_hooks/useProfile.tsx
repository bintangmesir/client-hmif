import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../schema";
import { useEffect, useState } from "react";
import { useAuthUserContext } from "@/context/auth-provider";
import { useMutation } from "react-query";
import { patchProfile } from "@/services/profile";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type ProfileType = UseFormReturn<z.infer<typeof ProfileSchema>>;

const useProfile = () => {
  const user = useAuthUserContext();
  const [id, setId] = useState("");
  const { setFlashMessage } = useFlashMessageContext();
  const { isLoading, mutateAsync: patchProfileMutation } = useMutation({
    mutationKey: ["profile"],
    mutationFn: (formData: FormData) => patchProfile(formData),
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

  useEffect(() => {
    if (user !== undefined) {
      setId(user.data.id);
    }
  }, [user]);

  const form: ProfileType = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      fotoProfile: null,
    },
    values: user
      ? {
          name: user.data.name,
          email: user.data.email,
          fotoProfile: user.data.fotoProfile as unknown as FileList,
        }
      : undefined,
  });

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    if (values.fotoProfile) {
      for (let i = 0; i < values.fotoProfile.length; i++) {
        formData.append("fotoProfile", values.fotoProfile[i]);
      }
    }

    try {
      await patchProfileMutation(formData);
    } catch (e) {
      console.error(e);
    }
  };

  return { form, isLoading, onSubmit, id };
};

export default useProfile;
