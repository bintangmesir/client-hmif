import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export type CaraouselImgPreviewType = {
  props: { path?: string; data: string[] };
  className?: string;
  slideEnable?: boolean;
};

const CaraouselImgPreview = ({
  props,
  className,
  slideEnable = true,
}: CaraouselImgPreviewType): JSX.Element => {
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
        {props.data.map((item, index) => (
          <CarouselItem key={index}>
            <Zoom>
              <div className="p-1">
                <img
                  src={props.path ? `${props.path}/${item}` : item}
                  alt={`${item}`}
                  className={className}
                />
              </div>
            </Zoom>
          </CarouselItem>
        ))}
      </CarouselContent>
      {slideEnable && props.data.length > 1 ? (
        <div className="w-full text-center">
          Slide {current} of {props.data.length}
        </div>
      ) : null}
      {props.data.length > 1 ? (
        <>
          <CarouselPrevious type="button" />
          <CarouselNext type="button" />
        </>
      ) : null}
    </Carousel>
  );
};

export default CaraouselImgPreview;
