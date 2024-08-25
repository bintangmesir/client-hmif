import AdminLayout from "@/layouts/AdminLayout";
import CreateDataBuku from "@/features/data-buku/_pages/CreateDataBuku";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-buku)/data-buku/create",
)({
  component: () => (
    <AdminLayout>
      <CreateDataBuku />
    </AdminLayout>
  ),
});
