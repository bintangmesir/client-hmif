import AdminLayout from "@/layouts/AdminLayout";
import CreateDataBarang from "@/features/data-barang/_pages/CreateDataBarang";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-barang)/data-barang/create",
)({
  component: () => (
    <AdminLayout>
      <CreateDataBarang />
    </AdminLayout>
  ),
});
