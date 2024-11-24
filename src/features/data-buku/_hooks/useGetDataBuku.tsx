import { getBuku } from "@/services/buku";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DataBukuType } from "../schema";

const useGetDataBuku = (limit?: number | undefined) => {
  const [data, setData] = useState<DataBukuType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const { isLoading: firstIsLoading, isError: firstIsError } = useQuery({
    queryKey: ["getBuku"],
    queryFn: async () => getBuku(offset, limit),
    enabled: data.length < 1,
    onSuccess: (item) => {
      setData(item.data);
      setOffset(item.offset);
      setLength(item.count);
    },
  });

  const {
    mutateAsync: getBukuMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getBukuByOffset"],
    mutationFn: async () => getBuku(offset, limit),
    onSuccess: (item) => {
      setData((data) => [...data, ...item.data]);
      setOffset(item.offset);
    },
  });

  return {
    data,
    length,
    isLoading,
    isError,
    firstIsLoading,
    firstIsError,
    getBukuMutation,
  };
};

export default useGetDataBuku;
