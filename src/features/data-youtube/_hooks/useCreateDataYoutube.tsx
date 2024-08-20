import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataYoutubeSchema } from "../schema";
import { useMutation } from "react-query";
import { postYoutube } from "@/services/youtube";
import { useLocation, useNavigate } from "@tanstack/react-router";

export type CreateDataYoutubeType = UseFormReturn<
  z.infer<typeof DataYoutubeSchema>
>;

const useCreateDataYoutube = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const {
    isError,
    isLoading,
    mutateAsync: postYoutubeMutation,
  } = useMutation({
    mutationKey: ["postYoutube"],
    mutationFn: (formData: FormData) => postYoutube(formData),
  });
  const form: CreateDataYoutubeType = useForm<
    z.infer<typeof DataYoutubeSchema>
  >({
    resolver: zodResolver(DataYoutubeSchema),
    defaultValues: {
      judul: "",
      link: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof DataYoutubeSchema>) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("link", values.link);

    try {
      await postYoutubeMutation(formData);
    } catch (e) {
      console.error(e);
    }

    if (isError) {
      navigate({ to: location.pathname });
    }

    navigate({ to: "/data-youtube" });
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataYoutube;
