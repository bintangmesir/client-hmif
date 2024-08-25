import useGetDataYoutube from "../_hooks/useGetDataYoutube";
import { TypographyH2, TypographyH3 } from "@/components/costum/Typhography";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const SectionVideoPlay = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4">
      <TypographyH2 className="text-center">{title}</TypographyH2>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={url}
          title={title}
          className="absolute left-0 top-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>
    </div>
  );
};

const CardDataYoutubeClient = () => {
  const {
    data,
    offset,
    length,
    isLoading,
    firstIsError,
    firstIsLoading,
    getYoutubeMutation,
    title,
    setTitle,
    url,
    setUrl,
  } = useGetDataYoutube(6);

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
    <section className="container flex flex-col items-center justify-center gap-8">
      <SectionVideoPlay url={url} title={title} />
      <div className="grid w-full grid-cols-1 flex-col items-center justify-start gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((content) => {
          return (
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-primary px-4 py-3 text-center font-medium ${content.judul === title ? "bg-primary text-card" : ""}`}
              key={content.id}
              onClick={() => {
                setUrl(content.link);
                setTitle(content.judul);
              }}
            >
              {content.judul}
            </div>
          );
        })}
      </div>
      {data.length < length ? (
        <>
          {!isLoading ? (
            <Button
              onClick={async () => {
                try {
                  await getYoutubeMutation(offset);
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

export default CardDataYoutubeClient;
