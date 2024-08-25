import useGetDataYoutube from "@/features/data-youtube/_hooks/useGetDataYoutube";
import { ChartConfig } from "@/components/ui/chart";
import { Bar } from "recharts";
import ChartComponent, {
  ChartComponentProps,
} from "@/components/costum/ChartComponent";
import { DataYoutubeType } from "@/features/data-youtube/schema";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CardChartDataYoutube = () => {
  const { data } = useGetDataYoutube();

  const [year, setYear] = useState(new Date().getFullYear());

  function generateYearArray() {
    const startYear = 2010;
    const currentYear = new Date().getFullYear();
    const yearRange = currentYear - startYear + 1;

    return Array(yearRange)
      .fill(yearRange)
      .map((_, i) => startYear + i);
  }

  function filterYoutubeByMonth(
    youtube: DataYoutubeType[],
    month: number,
    year: number,
  ) {
    return youtube.filter((item) => {
      const youtubeDate = new Date(item.createdAt);
      const youtubeMonth = youtubeDate.getMonth();
      const youtubeYear = youtubeDate.getFullYear();

      return youtubeMonth === month && youtubeYear === year;
    });
  }

  const chartData = [
    ...[
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ].map((month, id) => {
      return {
        month: month,
        count: filterYoutubeByMonth(data, id, year).length,
      };
    }),
  ];

  const chartConfig = {
    count: {
      label: "Total Youtube",
    },
  } satisfies ChartConfig;

  const chartProps: ChartComponentProps = {
    title: "Data Youtube",
    description: `Total Data Youtube Berdasarkan Bulan Pada Tahun ${year}`,
    data: chartData,
    config: chartConfig,
    dataKeyAxis: "month",
  };

  return (
    <ChartComponent
      props={chartProps}
      selectOption={
        <Select
          onValueChange={(value) => setYear(+value)}
          value={year.toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {generateYearArray().map((item, id) => {
              return (
                <SelectItem value={item.toString()} key={id}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      }
    >
      <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
    </ChartComponent>
  );
};

export default CardChartDataYoutube;
