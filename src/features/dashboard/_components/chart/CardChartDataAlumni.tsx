import useGetDataAlumni from "@/features/data-alumni/_hooks/useGetDataAlumni";
import { ChartConfig } from "@/components/ui/chart";
import { Bar } from "recharts";
import ChartComponent, {
  ChartComponentProps,
} from "@/components/costum/ChartComponent";

const CardChartDataalumni = () => {
  const { data } = useGetDataAlumni();

  function generateYearArray() {
    const startYear = 1993;
    const currentYear = new Date().getFullYear();
    const yearRange = currentYear - startYear + 1;

    return Array(yearRange)
      .fill(yearRange)
      .map((_, i) => startYear + i);
  }

  const chartData = [
    ...generateYearArray().map((year) => {
      return {
        year: year,
        count: data.filter((item) => +item.angkatan === year).length,
      };
    }),
  ];

  const chartConfig = {
    count: {
      label: "Total Alumni",
    },
  } satisfies ChartConfig;

  const chartProps: ChartComponentProps = {
    title: "Data Alumni",
    description: "Total Data Alumni Berdasarkan Angkatan",
    data: chartData,
    config: chartConfig,
    dataKeyAxis: "year",
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <ChartComponent props={chartProps}>
        <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
      </ChartComponent>
    </div>
  );
};

export default CardChartDataalumni;
