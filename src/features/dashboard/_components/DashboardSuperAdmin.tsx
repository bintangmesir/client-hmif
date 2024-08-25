import CardChartDataAdmin from "./chart/CardChartDataAdmin";
import CardUserActive from "./CardUserActive";

const DashboardSuperAdmin = () => {
  return (
    <div className="container grid grid-cols-1 justify-center gap-4 lg:grid-cols-2">
      <CardUserActive />
      <CardChartDataAdmin />
    </div>
  );
};

export default DashboardSuperAdmin;
