import useGetDataBarang from "@/features/data-barang/_hooks/useGetDataBarang";
import { ChartConfig } from "@/components/ui/chart";
import { Bar } from "recharts";
import ChartComponent, {
  ChartComponentProps,
} from "@/components/costum/ChartComponent";

const CardChartDataBarang = () => {
  const { data } = useGetDataBarang();
  const chartData = [
    {
      condition: "Kondisi Baik",
      count: data.filter((data) => data.baik).length,
      total: data.reduce((sum, data) => sum + data.baik, 0),
    },
    {
      condition: "Rusak Ringan",
      count: data.filter((data) => data.rusakRingan).length,
      total: data.reduce((sum, data) => sum + data.rusakRingan, 0),
    },
    {
      condition: "Rusak Berat",
      count: data.filter((data) => data.rusakRingan).length,
      total: data.reduce((sum, data) => sum + data.rusakBerat, 0),
    },
  ];

  const chartConfig = {
    count: {
      label: "Banyak data",
    },
    total: {
      label: "Jumlah data",
    },
  } satisfies ChartConfig;

  const chartProps: ChartComponentProps = {
    title: "Data Barang",
    description: "Total Data Barang Berdasarkan Kondisi",
    data: chartData,
    config: chartConfig,
    dataKeyAxis: "condition",
  };

  return (
    <div className="flex w-full items-start justify-center">
      <ChartComponent props={chartProps}>
        <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={4} />
      </ChartComponent>
    </div>
  );
};

export default CardChartDataBarang;
