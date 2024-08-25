import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { InstagramDataType } from "../schema";
import { getInstagram } from "@/services/instagram";

const useGetDataInstagram = () => {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<InstagramDataType[]>([]);

  const { isError: firstIsError, isLoading: firstIsLoading } = useQuery({
    queryKey: ["getInstagram"],
    queryFn: async () => getInstagram(),
    onSuccess: (item) => {
      setUrl(item.paging.next);
      setData(item.data);
    },
    enabled: url === "",
  });
  const {
    mutateAsync: getInstagramMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getInstagram"],
    mutationFn: getInstagram,
    onSuccess: (item) => {
      setUrl(item.paging.next);
      setData((data) => [...data, ...item.data]);
    },
  });
  return {
    data,
    isLoading,
    isError,
    url,
    firstIsError,
    firstIsLoading,
    getInstagramMutation,
  };
};

export default useGetDataInstagram;
