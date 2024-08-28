import { getBarang } from "@/services/barang";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DataBarangType } from "../schema";

const useGetDataBarang = () => {
  const [data, setData] = useState<DataBarangType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const { isLoading: firstIsLoading, isError: firstIsError } = useQuery({
    queryKey: ["getBarang"],
    queryFn: async () => getBarang(offset),
    enabled: data.length < 1,
    onSuccess: (item) => {
      setData(item.data);
      setOffset(item.offset);
      setLength(item.count);
    },
  });

  const {
    mutateAsync: getBarangMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getBarangByOffset"],
    mutationFn: getBarang,
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
    getBarangMutation,
  };
};

export default useGetDataBarang;
