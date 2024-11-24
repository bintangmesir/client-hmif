import { getArtikel } from "@/services/artikel";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DataArtikelType } from "../schema";

const useGetDataArtikel = (limit?: number | undefined) => {
  const [data, setData] = useState<DataArtikelType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const { isLoading: firstIsLoading, isError: firstIsError } = useQuery({
    queryKey: ["getArtikel"],
    queryFn: async () => getArtikel(offset, limit),
    enabled: data.length < 1,
    onSuccess: (item) => {
      setData(item.data);
      setOffset(item.offset);
      setLength(item.count);
    },
  });

  const {
    mutateAsync: getArtikelMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getArtikelByOffset"],
    mutationFn: async () => getArtikel(offset, limit),
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
    getArtikelMutation,
  };
};

export default useGetDataArtikel;
