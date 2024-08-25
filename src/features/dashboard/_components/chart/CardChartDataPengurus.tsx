import useGetDataPengurus from "@/features/data-pengurus/_hooks/useGetDataPengurus";
import { ChartConfig } from "@/components/ui/chart";
import { Bar } from "recharts";
import ChartComponent, {
  ChartComponentProps,
} from "@/components/costum/ChartComponent";

const CardChartDataPengurus = () => {
  const { data } = useGetDataPengurus();
  const chartData = [
    {
      departemen: "Ketua Himpunan",
      count: data.filter((data) => data.jabatan === "ketua_himpunan").length,
    },
    {
      departemen: "Wakil Ketua Himpunan",
      count: data.filter((data) => data.jabatan === "wakil_ketua_himpunan")
        .length,
    },
    {
      departemen: "Sekretaris",
      count: data.filter((data) => data.departemen === "sekretaris").length,
    },
    {
      departemen: "Bendahara",
      count: data.filter((data) => data.departemen === "bendahara").length,
    },
    {
      departemen: "Departemen IPTEK",
      count: data.filter((data) => data.departemen === "departemen_iptek")
        .length,
    },
    {
      departemen: "Departemen KOMINFO",
      count: data.filter((data) => data.departemen === "departemen_kominfo")
        .length,
    },
    {
      departemen: "Departemen Kaderisasi",
      count: data.filter((data) => data.departemen === "departemen_kaderisasi")
        .length,
    },
    {
      departemen: "Departemen PRHP",
      count: data.filter((data) => data.departemen === "departemen_prhp")
        .length,
    },
    {
      departemen: "Departemen PENGMAS",
      count: data.filter((data) => data.departemen === "departemen_pengmas")
        .length,
    },
  ];

  const chartConfig = {
    count: {
      label: "Total member",
    },
  } satisfies ChartConfig;

  const chartProps: ChartComponentProps = {
    title: "Data Pengurus",
    description: "Total Data Pengurus",
    data: chartData,
    config: chartConfig,
    dataKeyAxis: "departemen",
  };

  return (
    <ChartComponent props={chartProps}>
      <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
    </ChartComponent>
  );
};

export default CardChartDataPengurus;
