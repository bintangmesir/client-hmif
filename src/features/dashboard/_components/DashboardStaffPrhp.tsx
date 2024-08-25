import CardUserActive from "./CardUserActive";
import CardChartDataBarang from "./chart/CardChartDataBarang";
import CardChartDataBuku from "./chart/CardChartDataBuku";
import CardChartDataalumni from "./chart/CardChartDataAlumni";

const DashboardStaffPrhp = () => {
  return (
    <div className="container flex w-full flex-col items-center justify-start gap-4">
      <div className="grid w-full grid-cols-1 justify-center gap-4 lg:grid-cols-2">
        <CardUserActive />
        <CardChartDataBarang />
      </div>
      <CardChartDataBuku />
      <CardChartDataalumni />
    </div>
  );
};

export default DashboardStaffPrhp;
