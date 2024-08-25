import CardChartDataPengurus from "./chart/CardChartDataPengurus";
import ChartDataAdmin from "./chart/CardChartDataAdmin";
import CardUserActive from "./CardUserActive";
import CardChartDataArtikel from "./chart/CardChartDataArtikel";
import CardChartDataYoutube from "./chart/CardChartDataYoutube";

const DashboardKadepKominfo = () => {
  return (
    <div className="container flex w-full flex-col items-center justify-start gap-4">
      <div className="grid w-full grid-cols-1 justify-center gap-4 lg:grid-cols-2">
        <CardUserActive />
        <ChartDataAdmin />
      </div>
      <div className="grid w-full grid-cols-1 justify-center gap-4 lg:grid-cols-2">
        <CardChartDataArtikel />
        <CardChartDataYoutube />
      </div>
      <CardChartDataPengurus />
    </div>
  );
};

export default DashboardKadepKominfo;
