import CardUserActive from "./CardUserActive";
import CardChartDataYoutube from "./chart/CardChartDataYoutube";
import CardChartDataArtikel from "./chart/CardChartDataArtikel";
import CardChartDataPengurus from "./chart/CardChartDataPengurus";

const DashboardStaffKominfo = () => {
  return (
    <div className="container flex w-full flex-col items-center justify-start gap-4">
      <div className="grid w-full grid-cols-1 justify-center gap-4 lg:grid-cols-2">
        <CardUserActive />
        <CardChartDataPengurus />
      </div>
      <CardChartDataArtikel />
      <CardChartDataYoutube />
    </div>
  );
};

export default DashboardStaffKominfo;
