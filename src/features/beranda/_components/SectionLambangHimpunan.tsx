import TextRevealByWord from "@/components/magicui/text-reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "@/data/himpunan.json";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SectionLambangHimpunan = () => {
  const lambangHimpunan = data;

  return (
    <div className="container relative grid w-full grid-cols-1 items-start justify-center gap-4 bg-transparent pt-24 md:grid-cols-2">
      <div className="sticky top-0 z-10 hidden min-h-dvh items-center justify-center md:flex">
        <Card className="w-full max-w-sm border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-center">Logo HMIF</CardTitle>
            <CardDescription className="text-center">
              Himpunan Mahasiswa Teknik Informatika <br /> BEM-FT-UMJ
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Zoom>
              <img
                src="/images/LogoHMIF.png"
                className="h-auto w-full max-w-xs"
              />
            </Zoom>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full items-center justify-center md:hidden">
        <Card className="w-full max-w-sm border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-center">Logo HMIF</CardTitle>
            <CardDescription className="text-center">
              Himpunan Mahasiswa Teknik Informatika <br /> BEM-FT-UMJ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Zoom>
              <img src="/images/LogoHMIF.png" className="h-auto w-full" />
            </Zoom>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {lambangHimpunan.lambangHimpunan.map((item, id) => (
          <div
            className="z-10 flex min-h-[16rem] items-center justify-center"
            key={id}
          >
            <TextRevealByWord text={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionLambangHimpunan;
