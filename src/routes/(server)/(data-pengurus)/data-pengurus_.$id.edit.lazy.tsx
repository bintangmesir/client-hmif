import CardUpdateDataPengurus from "@/features/data-pengurus/_components/CardUpdateDataPengurus";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-pengurus)/data-pengurus/$id/edit",
)({
  component: () => UpdateDataPengurus(),
});

function UpdateDataPengurus() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardUpdateDataPengurus />
      </div>
    </AdminLayout>
  );
}
