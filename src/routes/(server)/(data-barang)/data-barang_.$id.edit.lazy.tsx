import CardUpdateDataBarang from "@/features/data-barang/_components/CardUpdateDataBarang";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-barang)/data-barang/$id/edit",
)({
  component: () => UpdateDataBarang(),
});

function UpdateDataBarang() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardUpdateDataBarang />
      </div>
    </AdminLayout>
  );
}
