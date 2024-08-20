import { ReactNode } from "react";
import Marquee from "react-fast-marquee";

const Ribbon = ({
  props,
}: {
  props: {
    text: string;
    direction: "left" | "right" | "up" | "down" | undefined;
    icon?: ReactNode;
  };
}) => {
  return (
    <section className="z-30 flex w-full border-2 border-card bg-primary p-1">
      <Marquee direction={props.direction} autoFill={true}>
        <h1 className="mr-4 flex items-center gap-4 py-2 text-2xl text-card sm:text-3xl md:text-4xl">
          {props.text} {props.icon ? props.icon : null}
        </h1>
      </Marquee>
    </section>
  );
};

export default Ribbon;
