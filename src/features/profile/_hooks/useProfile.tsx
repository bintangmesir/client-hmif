import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../schema";
import { useEffect, useState } from "react";
import { useAuthUserContext } from "@/context/auth-provider";
import { splitStringToArray } from "@/utils/stringToArray";
import { useMutation } from "react-query";
import { patchProfile } from "@/services/profile";
import { useNavigate } from "@tanstack/react-router";

export type ProfileType = UseFormReturn<z.infer<typeof ProfileSchema>>;

const useProfile = () => {
  const navigate = useNavigate({ from: "/profile" });
  const user = useAuthUserContext();
  const [id, setId] = useState("");
  const [fotoProfile, setFotoProfile] = useState<string[]>();
  const {
    isError,
    isLoading,
    mutateAsync: patchProfileMutation,
  } = useMutation({
    mutationKey: ["profile"],
    mutationFn: patchProfile,
  });

  useEffect(() => {
    if (user !== undefined) {
      setId(user.data.id);
      const formatted = user.data.fotoProfile
        ? splitStringToArray(user.data.fotoProfile)
        : [];
      setFotoProfile(formatted);
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
          fotoProfile: null,
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

    if (isError) {
      navigate({ to: "/profile" });
    }

    navigate({ to: "/profile" });
  };

  return { form, isLoading, onSubmit, fotoProfile, id };
};

export default useProfile;
