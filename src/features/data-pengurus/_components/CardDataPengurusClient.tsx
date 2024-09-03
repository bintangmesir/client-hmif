import useGetDataPengurus from "../_hooks/useGetDataPengurus";
import { TypographyH3 } from "@/components/costum/Typhography";
import { VITE_APP_FILE_SERVER } from "@/data/env";
import { DataPengurusType } from "../schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stringTransformToWhiteSpace } from "@/utils/stringTransformToWhiteSpace";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SectionImagePengurus = ({ data }: { data: DataPengurusType[] }) => {
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
        {data.map((item, id) => (
          <CarouselItem key={id}>
            <div className="p-1">
              <Card className="border-2 border-primary shadow-none">
                <CardHeader>
                  <CardTitle>
                    {stringTransformToWhiteSpace(item.jabatan)}
                  </CardTitle>
                  <CardDescription>
                    {item.departemen !== "kahim_wakahim"
                      ? stringTransformToWhiteSpace(item.departemen)
                      : "Ketua dan Wakil Ketua Himpunan"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Zoom>
                    <img
                      src={
                        item.foto
                          ? `${VITE_APP_FILE_SERVER}/pengurus/${item.id}/${item?.foto}`
                          : `https://ui-avatars.com/api/?name=${item.name}`
                      }
                      alt={item.name}
                    />
                  </Zoom>
                </CardContent>
                <CardFooter className="flex w-full items-center justify-center">
                  <TypographyH3>{item.name}</TypographyH3>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {data.length > 1 ? (
        <div className="w-full text-center">
          Slide {current} of {data.length}
        </div>
      ) : null}
      {data.length > 1 ? (
        <>
          <CarouselPrevious type="button" />
          <CarouselNext type="button" />
        </>
      ) : null}
    </Carousel>
  );
};

const CardDataPengurusClient = () => {
  const { data, firstIsError, firstIsLoading, departemen, setDepartemen } =
    useGetDataPengurus();

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
    <section className="container grid w-full grid-cols-1 flex-col items-center justify-start gap-10 md:grid-cols-2">
      <div className="container">
        <SectionImagePengurus
          data={data.filter((item) => item.departemen === departemen)}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        {[
          "kahim_wakahim",
          "sekretaris",
          "bendahara",
          "departemen_iptek",
          "departemen_kominfo",
          "departemen_kaderisasi",
          "departemen_prhp",
          "departemen_pengmas",
        ].map((content, id) => {
          return (
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-primary px-4 py-3 text-center font-medium ${content === departemen ? "bg-primary text-card" : ""}`}
              key={id}
              onClick={() => {
                setDepartemen(content);
              }}
            >
              {content === "kahim_wakahim"
                ? stringTransformToWhiteSpace("ketua_dan_wakil_ketua_himpunan")
                : stringTransformToWhiteSpace(content)}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CardDataPengurusClient;
