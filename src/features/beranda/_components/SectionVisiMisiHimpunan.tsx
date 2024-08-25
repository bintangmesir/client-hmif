import { TypographyList } from "@/components/costum/Typhography";
import RetroGrid from "@/components/magicui/retro-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "@/data/himpunan.json";

const SectionVisiMisiHimpunan = () => {
  const visiMisi = data;

  return (
    <section className="relative grid w-full grid-cols-1 items-start justify-center gap-4 md:grid-cols-2">
      <div className="container flex w-full items-center justify-center">
        <Card className="max-w-md border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-center">Visi</CardTitle>
            <CardDescription className="text-center">
              Visi HMIF BEM-FT-UMJ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyList props={visiMisi.visiMisi.visi} />
          </CardContent>
        </Card>
      </div>
      <div className="container flex w-full items-center justify-center">
        <Card className="max-w-md border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-center">Misi</CardTitle>
            <CardDescription className="text-center">
              Misi HMIF BEM FT-UMJ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyList props={visiMisi.visiMisi.misi} />
          </CardContent>
        </Card>
      </div>
      <RetroGrid />
    </section>
  );
};

export default SectionVisiMisiHimpunan;
