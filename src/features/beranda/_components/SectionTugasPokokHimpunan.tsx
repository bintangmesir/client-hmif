import { useTheme } from "@/context/theme-provider";
import { useEffect, useState } from "react";
import { TypographyH1 } from "@/components/costum/Typhography";
import data from "@/data/himpunan.json";
import Particles from "@/components/magicui/particles";

const SectionTugasPokokHimpunan = () => {
  const tugasPokok = data;
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
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
      <Particles
        className="absolute inset-0"
        quantity={500}
        ease={50}
        color={color}
        refresh
      />
    </div>
  );
};

export default SectionTugasPokokHimpunan;
