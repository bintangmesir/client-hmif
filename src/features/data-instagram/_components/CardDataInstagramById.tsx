import { Fragment, useEffect, useRef, useState } from "react";
import { InstagramDataType } from "../schema";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import useGetDataByIdInstagram from "../_hooks/useGetByIdDataInstagram";
import { TypographyH3, TypographyP } from "@/components/costum/Typhography";
import { Badge } from "@/components/ui/badge";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const VideoContent = ({ props }: { props: InstagramDataType }) => {
  return (
    <iframe
      title={props?.id}
      src={props?.media_url}
      className="absolute left-0 top-0 h-full w-full"
      allowFullScreen
    />
  );
};

const ImageContent = ({ props }: { props: InstagramDataType }) => {
  return (
    <Zoom>
      <img src={props?.media_url} alt={props?.media_url} />
    </Zoom>
  );
};

const CarouselImageContent = ({ props }: { props: InstagramDataType }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setApi}
    >
      <CarouselContent>
        {props.children.data?.map((item, id) => (
          <CarouselItem key={id}>
            {item?.media_type === "VIDEO" ? (
              <div className="p-1">
                <iframe
                  title={item?.id}
                  src={item?.media_url}
                  allowFullScreen
                />
              </div>
            ) : (
              <Zoom>
                <div className="p-1">
                  <img src={item?.media_url} alt={item?.media_url} />
                </div>
              </Zoom>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      {props.children.data.length > 1 ? (
        <div className="w-full text-center">
          Slide {current} of {props.children.data.length}
        </div>
      ) : null}
      {props.children.data.length > 1 ? (
        <>
          <CarouselPrevious type="button" />
          <CarouselNext type="button" />
        </>
      ) : null}
    </Carousel>
  );
};

const CardDataInstagramById = () => {
  const { data, isError, isLoading } = useGetDataByIdInstagram();

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
      <div className="container flex w-full max-w-lg flex-col items-center justify-center gap-8">
        <Badge>
          {new Date(data.timestamp).toLocaleString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "long",
          })}
        </Badge>
        <AspectRatio ratio={1 / 1}>
          {data?.media_type === "CAROUSEL_ALBUM" ? (
            <CarouselImageContent props={data} />
          ) : data?.media_type === "VIDEO" ? (
            <VideoContent props={data} />
          ) : (
            <ImageContent props={data} />
          )}
        </AspectRatio>
        <div className="flex w-full flex-col">
          {data.caption
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

export default CardDataInstagramById;
