import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ReactNode } from "@tanstack/react-router";

/* eslint-disable  @typescript-eslint/no-explicit-any */

export type ChartComponentProps = {
  title: string;
  description: string;
  config: ChartConfig;
  dataKeyAxis: string;
  data?: any[] | undefined;
};

const ChartComponent = ({
  children,
  props,
  selectOption,
}: {
  props: ChartComponentProps;
  selectOption?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="flex w-full items-start justify-center overflow-auto">
      <Card className="w-full border-2 border-primary">
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
          {selectOption}
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={props.config}
            className="min-h-[200px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={props.data}
              layout="vertical"
              {...{
                overflow: "visible",
              }}
            >
              <CartesianGrid vertical={false} color="hsl(var(--primary))" />
              <XAxis type="number" />
              <YAxis dataKey={props.dataKeyAxis} type="category" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {children}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartComponent;
