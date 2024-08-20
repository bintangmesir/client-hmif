import { TypographyH2, TypographyList } from "@/components/costum/Typhography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "@/data/himpunan.json";

const SectionLambangHimpunan = () => {
  const lambangHimpunan = data;
  return (
    <section className="container grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
      <div className="flex w-full items-center justify-center">
        <Card className="max-w-sm border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-center">Logo HMIF</CardTitle>
            <CardDescription className="text-center">
              Himpunan Mahasiswa Teknik Informatika <br /> BEM-FT-UMJ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src="/images/LogoHMIF.png" className="h-auto w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <TypographyH2>Makna Simbol</TypographyH2>
        <TypographyList props={lambangHimpunan.lambangHimpunan} />
      </div>
    </section>
  );
};

export default SectionLambangHimpunan;
