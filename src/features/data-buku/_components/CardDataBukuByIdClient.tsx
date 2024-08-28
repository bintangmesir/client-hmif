import { Fragment } from "react";
import useGetDataByIdBuku from "../_hooks/useGetByIdDataBuku";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/costum/Typhography";
import { VITE_APP_FILE_SERVER } from "@/data/env";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CardDataBukuByIdClient = () => {
  const { data, isError, isLoading } = useGetDataByIdBuku();

  if (isError) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-center">
        <TypographyH3>Oops! Something Wrong...</TypographyH3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-center">
        <TypographyH3>Loading...</TypographyH3>
      </div>
    );
  }
  return (
    data && (
      <div className="container flex w-full max-w-lg flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center">
          <TypographyH2>{data.data.judul}</TypographyH2>
        </div>
        <Zoom>
          <div className="flex w-full items-center justify-center">
            <img
              src={
                data.data.cover
                  ? `${VITE_APP_FILE_SERVER}/buku/${data.data.id}/${data.data?.cover}`
                  : `https://ui-avatars.com/api/?name=${data.data.judul}`
              }
              alt={data.data.judul}
              className="h-auto w-full"
            />
          </div>
        </Zoom>
        <div className="flex w-full flex-col items-start justify-center gap-2">
          <TypographyP>Penulis : {data.data.penulis}</TypographyP>
          <TypographyP>Tahun Terbit : {data.data.tahunTerbit}</TypographyP>
          <TypographyP>Penerbit : {data.data.penerbit}</TypographyP>
          <TypographyP>Kode buku : {data.data.kode}</TypographyP>
        </div>
        <div className="flex w-full flex-col">
          {data.data.abstrak
            ?.split(/\r?\n/)
            .map((item, id) => (
              <Fragment key={id}>
                {item !== "" ? <TypographyP>{item}</TypographyP> : <br />}
              </Fragment>
            ))}
        </div>
      </div>
    )
  );
};

export default CardDataBukuByIdClient;
