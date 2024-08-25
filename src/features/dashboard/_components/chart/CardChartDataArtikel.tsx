import useGetDataArtikel from "@/features/data-artikel/_hooks/useGetDataArtikel";
import { ChartConfig } from "@/components/ui/chart";
import { Bar } from "recharts";
import ChartComponent, {
  ChartComponentProps,
} from "@/components/costum/ChartComponent";
import { DataArtikelType } from "@/features/data-artikel/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const CardChartDataArtikel = () => {
  const { data } = useGetDataArtikel();
  const [year, setYear] = useState(new Date().getFullYear());

  function filterArticlesByMonth(
    artikel: DataArtikelType[],
    month: number,
    year: number,
  ) {
    return artikel.filter((item) => {
      const artikelDate = new Date(item.createdAt);
      const artikelMonth = artikelDate.getMonth();
      const artikelYear = artikelDate.getFullYear();

      return artikelMonth === month && artikelYear === year;
    });
  }

  function generateYearArray() {
    const startYear = 2010;
    const currentYear = new Date().getFullYear();
    const yearRange = currentYear - startYear + 1;

    return Array(yearRange)
      .fill(yearRange)
      .map((_, i) => startYear + i);
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
        count: filterArticlesByMonth(data, id, year).length,
      };
    }),
  ];

  const chartConfig = {
    count: {
      label: "Total artikel",
    },
  } satisfies ChartConfig;

  const chartProps: ChartComponentProps = {
    title: "Data Artikel",
    description: `Total Data Artikel Berdasarkan Bulan Pada Tahun ${year}`,
    data: chartData,
    config: chartConfig,
    dataKeyAxis: "month",
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
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
    </div>
  );
};

export default CardChartDataArtikel;
