import useGetDataBuku from "../_hooks/useGetDataBuku";
import { TypographyH3 } from "@/components/costum/Typhography";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { VITE_APP_FILE_SERVER } from "@/data/env";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CardDataBukuClient = () => {
  const {
    data,
    offset,
    length,
    isLoading,
    firstIsError,
    firstIsLoading,
    getBukuMutation,
  } = useGetDataBuku(6);

  if (firstIsError) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-center">
        <TypographyH3>Oops! Something Wrong...</TypographyH3>
      </div>
    );
  }

  if (firstIsLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-center">
        <TypographyH3>Loading...</TypographyH3>
      </div>
    );
  }

  return (
    <section className="container flex w-full flex-col items-center justify-center gap-4">
      <div className="grid w-full grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((content, id) => {
          return (
            <Link
              key={id}
              to={`/buku/${content.id}/buku`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Card className="w-full border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-4">
                    {content.judul}
                  </CardTitle>
                  <CardDescription>
                    <span className="flex w-full items-center justify-between">
                      <span>Kode Buku : {content.kode}</span>
                      <span>Tahun terbit : {content?.tahunTerbit}</span>
                    </span>
                    Penulis : {content.penulis}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex w-full flex-col items-center justify-center gap-4">
                  <Zoom>
                    <AspectRatio ratio={3 / 4} className="flex justify-center">
                      <img
                        src={
                          content.cover
                            ? `${VITE_APP_FILE_SERVER}/buku/${content.id}/${content?.cover}`
                            : `https://ui-avatars.com/api/?name=${content.judul}`
                        }
                        alt={content.judul}
                      />
                    </AspectRatio>
                  </Zoom>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      {data.length < length ? (
        <>
          {!isLoading ? (
            <Button
              onClick={async () => {
                try {
                  await getBukuMutation(offset);
                } catch (e) {
                  console.error(e);
                }
              }}
              className="w-full"
            >
              Load more
            </Button>
          ) : (
            <Button
              className="flex w-full items-center justify-center"
              disabled
            >
              <Loader className="mr-2 animate-spin" /> Loading
            </Button>
          )}
        </>
      ) : null}
    </section>
  );
};

export default CardDataBukuClient;
