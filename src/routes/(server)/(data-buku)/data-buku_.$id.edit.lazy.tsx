import UpdateDataBuku from "@/features/data-buku/_pages/UpdateDataBuku";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-buku)/data-buku/$id/edit",
)({
  component: () => (
    <AdminLayout>
      <UpdateDataBuku />
    </AdminLayout>
  ),
});
