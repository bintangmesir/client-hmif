import AdminLayout from "@/layouts/AdminLayout";
import UpdateDataBarang from "@/features/data-barang/_pages/UpdateDataBarang";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-barang)/data-barang/$id/edit",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataBarang />
    </AdminLayout>
  ),
});
