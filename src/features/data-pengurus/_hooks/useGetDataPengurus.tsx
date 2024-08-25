import { getPengurus } from "@/services/pengurus";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DataPengurusType } from "../schema";

const useGetDataPengurus = () => {
  const [data, setData] = useState<DataPengurusType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [departemen, setDepartemen] = useState("");
  const { isLoading: firstIsLoading, isError: firstIsError } = useQuery({
    queryKey: ["getPengurus"],
    queryFn: async () => getPengurus(offset),
    enabled: data.length < 1,
    onSuccess: (item) => {
      const kahimData = item.data.filter(
        (item) => item.departemen === "kahim_wakahim",
      );
      setData(item.data);
      setOffset(item.offset);
      setLength(item.count);
      setDepartemen(
        kahimData.length ? kahimData[0].departemen : item.data[0].departemen,
      );
    },
  });

  const {
    mutateAsync: getPengurusMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["getPengurusByOffset"],
    mutationFn: getPengurus,
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
    getPengurusMutation,
    departemen,
    setDepartemen,
  };
};

export default useGetDataPengurus;
