import useGetDataBuku from "@/features/data-buku/_hooks/useGetDataBuku";
import { ChartConfig } from "@/components/ui/chart";
import { Bar } from "recharts";
import ChartComponent, {
  ChartComponentProps,
} from "@/components/costum/ChartComponent";

const CardChartDataBuku = () => {
  const { data } = useGetDataBuku();
  function generateYearArray() {
    const startYear = 1990;
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
        count: data.filter((item) => +item.tahunTerbit === year).length,
      };
    }),
  ];

  const chartConfig = {
    count: {
      label: "Total buku",
    },
  } satisfies ChartConfig;

  const chartProps: ChartComponentProps = {
    title: "Data buku",
    description: "Total Data Buku Berdasarkan Tahun Terbit",
    data: chartData,
    config: chartConfig,
    dataKeyAxis: "year",
  };

  return (
    <ChartComponent props={chartProps}>
      <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
    </ChartComponent>
  );
};

export default CardChartDataBuku;
