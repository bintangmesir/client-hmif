import useGetDataAdmin from "@/features/data-admin/_hooks/useGetDataAdmin";
import { AdminRoleEnum } from "@/context/auth-provider";
import { ChartConfig } from "@/components/ui/chart";
import { Bar } from "recharts";
import ChartComponent, {
  ChartComponentProps,
} from "@/components/costum/ChartComponent";

const CardChartDataAdmin = () => {
  const { data } = useGetDataAdmin();
  const chartData = [
    {
      user: "Super Admin",
      count: data.filter((data) => data.role === AdminRoleEnum.super_admin)
        .length,
    },
    {
      user: "Kadep Kominfo",
      count: data.filter((data) => data.role === AdminRoleEnum.kadep_kominfo)
        .length,
    },
    {
      user: "Kadep Prhp",
      count: data.filter((data) => data.role === AdminRoleEnum.kadep_prhp)
        .length,
    },
    {
      user: "Staff Kominfo",
      count: data.filter((data) => data.role === AdminRoleEnum.staff_kominfo)
        .length,
    },
    {
      user: "Staff Prhp",
      count: data.filter((data) => data.role === AdminRoleEnum.staff_prhp)
        .length,
    },
  ];

  const chartConfig = {
    count: {
      label: "Total data",
    },
  } satisfies ChartConfig;

  const chartProps: ChartComponentProps = {
    title: "Data Admin",
    description: "Total Data Admin",
    data: chartData,
    config: chartConfig,
    dataKeyAxis: "user",
  };

  return (
    <div className="flex w-full items-start justify-center">
      <ChartComponent props={chartProps}>
        <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
      </ChartComponent>
    </div>
  );
};

export default CardChartDataAdmin;
