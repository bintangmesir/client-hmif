import CardUserActive from "./CardUserActive";
import CardChartDataAdmin from "./chart/CardChartDataAdmin";
import CardChartDataBarang from "./chart/CardChartDataBarang";
import CardChartDataalumni from "./chart/CardChartDataAlumni";
import CardChartDataBuku from "./chart/CardChartDataBuku";

const DashboardKadepPrhp = () => {
  return (
    <div className="container flex w-full flex-col items-center justify-start gap-4">
      <div className="grid w-full grid-cols-1 justify-center gap-4 lg:grid-cols-2">
        <CardUserActive />
        <CardChartDataAdmin />
      </div>
      <CardChartDataBuku />
      <div className="grid w-full grid-cols-1 justify-center gap-4 lg:grid-cols-2">
        <CardChartDataBarang />
        <CardChartDataalumni />
      </div>
    </div>
  );
};

export default DashboardKadepPrhp;
