import { Loader } from "lucide-react";
import useGetDataInstagram from "../_hooks/useGetDataInstagram";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "@tanstack/react-router";
import { TypographyH3 } from "@/components/costum/Typhography";

const CardDataInstagram = () => {
  const {
    data,
    url,
    isLoading,
    firstIsError,
    firstIsLoading,
    getInstagramMutation,
  } = useGetDataInstagram();

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
        {data.map((content) => {
          return (
            <Link
              key={content.id}
              to={`/artikel/${content.id}/instagram`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Card className="w-full border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-4">
                    hmif_ftumj
                  </CardTitle>
                  <CardDescription>
                    {content?.media_type === "VIDEO"
                      ? "Video"
                      : content?.media_type === "CAROUSEL_ALBUM"
                        ? "Carousel Album"
                        : "Image"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AspectRatio ratio={1 / 1} className="flex">
                    {content?.media_type === "VIDEO" ? (
                      <img
                        src={content?.thumbnail_url}
                        alt={content?.thumbnail_url}
                        className="h-auto w-full"
                      />
                    ) : (
                      <img src={content?.media_url} alt={content?.media_url} />
                    )}
                  </AspectRatio>
                </CardContent>
                <CardFooter className="flex w-full justify-center text-center">
                  {new Date(content?.timestamp).toLocaleString("id-ID", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "long",
                  })}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
      {!isLoading ? (
        <Button
          onClick={async () => {
            try {
              await getInstagramMutation(url);
            } catch (e) {
              console.error(e);
            }
          }}
          className="w-full"
        >
          Load more
        </Button>
      ) : (
        <Button className="flex w-full items-center justify-center" disabled>
          <Loader className="mr-2 animate-spin" /> Loading
        </Button>
      )}
    </section>
  );
};

export default CardDataInstagram;
