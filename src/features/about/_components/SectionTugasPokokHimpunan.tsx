import { TypographyList } from "@/components/costum/Typhography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "@/data/himpunan.json";

const SectionTugasPokokHimpunan = () => {
  const tugasPokok = data;
  const bgUrl =
    "https://images.unsplash.com/photo-1654676066221-500d63a81951?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlxdWlkJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D";
  return (
    <section
      className="container flex min-h-dvh w-full items-center justify-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Tugas Pokok</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <TypographyList props={tugasPokok.tugasPokok} />
        </CardContent>
      </Card>
    </section>
  );
};

export default SectionTugasPokokHimpunan;
