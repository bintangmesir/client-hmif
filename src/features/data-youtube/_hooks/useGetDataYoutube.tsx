import { getYoutube } from "@/services/youtube";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DataYoutubeType } from "../schema";

const useGetDataYoutube = (limit?: number | undefined) => {
  const [data, setData] = useState<DataYoutubeType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const { isLoading: firstIsLoading, isError: firstIsError } = useQuery({
    queryKey: ["getYoutube"],
    queryFn: async () => getYoutube(offset, limit),
    enabled: data.length < 1,
    onSuccess: (item) => {
      setData(item.data);
      setOffset(item.offset);
      setLength(item.count);
      setTitle(item.data[0].judul);
      setUrl(item.data[0].link);
    },
  });

  const {
    mutateAsync: getYoutubeMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getYoutubeByOffset"],
    mutationFn: getYoutube,
    onSuccess: (item) => {
      setData((data) => [...data, ...item.data]);
      setOffset(item.offset);
    },
  });

  return {
    data,
    offset,
    length,
    isLoading,
    isError,
    firstIsLoading,
    firstIsError,
    getYoutubeMutation,
    title,
    setTitle,
    url,
    setUrl,
  };
};

export default useGetDataYoutube;
