import { TypographyH1 } from "@/components/costum/Typhography";
import GridPattern from "@/components/magicui/grid-pattern";
import data from "@/data/himpunan.json";
import { cn } from "@/lib/utils";

const SectionTugasPokokHimpunan = () => {
  const tugasPokok = data;
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {tugasPokok.tugasPokok.map((item, id) => (
        <div
          className="container flex min-h-dvh w-full max-w-3xl items-center justify-center"
          key={id}
        >
          <TypographyH1>{item}</TypographyH1>
        </div>
      ))}
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  );
};

export default SectionTugasPokokHimpunan;
