import useGetDataArtikel from "../_hooks/useGetDataArtikel";
import { TypographyH3, TypographyP } from "@/components/costum/Typhography";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { EyeIcon, Loader } from "lucide-react";
import { VITE_APP_FILE_SERVER } from "@/data/env";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNumber } from "@/utils/formatNumber";

const CardDataArtikelClient = () => {
  const {
    data,
    length,
    isLoading,
    firstIsError,
    firstIsLoading,
    getArtikelMutation,
  } = useGetDataArtikel(6);

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
    <section className="container flex w-full flex-col items-center justify-center gap-4 bg-background py-10">
      <div className="grid w-full grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((content, id) => {
          return (
            <Link
              key={id}
              to={`/artikel/${content.id}/artikel`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Card className="w-full border-2 border-primary">
                <CardHeader>
                  <CardTitle className="line-clamp-2 min-h-12">
                    {content.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 min-h-10">
                    {content.subTitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex w-full flex-col items-center justify-center gap-4">
                  <AspectRatio ratio={1 / 1} className="flex justify-center">
                    <img
                      src={
                        content.thumbnail
                          ? `${VITE_APP_FILE_SERVER}/artikel/${content.id}/${content?.thumbnail}`
                          : `https://ui-avatars.com/api/?name=${content.thumbnail}`
                      }
                      alt={content.thumbnail ?? ""}
                    />
                  </AspectRatio>
                  <div className="flex w-full items-center justify-start">
                    <span className="flex items-center justify-center gap-2">
                      <EyeIcon /> {formatNumber(content.view)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-start gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        content.admins[0].fotoProfile
                          ? `${import.meta.env.VITE_APP_FILE_SERVER}/admin/${content.admins[0].id}/${content.admins[0].fotoProfile}`
                          : `https://ui-avatars.com/api/?name=${content.admins[0].name}`
                      }
                      alt={content.admins[0].name}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex w-full flex-col items-start justify-center p-1">
                    <TypographyP className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {content.admins[0].name}
                    </TypographyP>
                  </div>
                </CardFooter>
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
                  await getArtikelMutation();
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

export default CardDataArtikelClient;
