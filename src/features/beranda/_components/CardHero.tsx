import { BorderBeam } from "@/components/magicui/border-beam";
import GridPattern from "@/components/magicui/grid-pattern";
import HyperText from "@/components/magicui/hyper-text";
import Meteors from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";

const CardHero = () => {
  return (
    <div className="container">
      <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background shadow-xl">
        <Meteors number={30} />

        <img
          src="/images/LogoHMIF.png"
          className="h-auto w-full max-w-32 md:max-w-48"
        />

        <HyperText
          className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 md:text-5xl lg:text-7xl"
          text="HMIF BEM FT-UMJ"
        />
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
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </div>
  );
};

export default CardHero;
