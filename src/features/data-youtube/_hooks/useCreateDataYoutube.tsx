import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataYoutubeSchema } from "../schema";
import { useMutation } from "react-query";
import { postYoutube } from "@/services/youtube";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useFlashMessageContext } from "@/context/flash-message-provider";

export type CreateDataYoutubeType = UseFormReturn<
  z.infer<typeof DataYoutubeSchema>
>;

const useCreateDataYoutube = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });
  const { setFlashMessage } = useFlashMessageContext();
  const { isLoading, mutateAsync: postYoutubeMutation } = useMutation({
    mutationKey: ["postYoutube"],
    mutationFn: (formData: FormData) => postYoutube(formData),
    onSuccess: (item) => {
      if (item.status === "error") {
        setFlashMessage({
          title: "ERROR",
          description: item.message,
          status: item.status,
        });
      } else {
        navigate({ to: "/data-youtube" });
      }
    },
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
  };
  return { form, isLoading, onSubmit };
};

export default useCreateDataYoutube;
