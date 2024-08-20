import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ITypography {
  children: ReactNode;
  className?: string;
}

export const TypographyH1: FC<ITypography> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <h1
      className={cn(
        `${className}`,
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      )}
    >
      {children}
    </h1>
  );
};

export const TypographyH2: FC<ITypography> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <h2
      className={cn(
        `${className}`,
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      )}
    >
      {children}
    </h2>
  );
};

export const TypographyH3: FC<ITypography> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <h3
      className={cn(
        `${className}`,
        "scroll-m-20 text-2xl font-semibold tracking-tight",
      )}
    >
      {children}
    </h3>
  );
};

export const TypographyH4: FC<ITypography> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <h4
      className={cn(
        `${className}`,
        "scroll-m-20 text-xl font-semibold tracking-tight",
      )}
    >
      {children}
    </h4>
  );
};

export const TypographyP: FC<ITypography> = ({
  children,
  className,
}): JSX.Element => {
  return <p className={cn(`${className}`, "leading-7")}>{children}</p>;
};

export const TypographyList: FC<{ props: string[] }> = ({
  props,
}): JSX.Element => {
  return (
    <ul className="ml-6 list-disc [&>li]:mt-2">
      {props.map((item, id) => {
        return <li key={id}>{item}</li>;
      })}
    </ul>
  );
};

export const TypographyBlockquote: FC<ITypography> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <blockquote className={cn(`${className}`, "mt-6 border-l-2 pl-6 italic")}>
      {children}
    </blockquote>
  );
};
