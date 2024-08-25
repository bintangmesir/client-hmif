import IndexDataBuku from "@/features/data-buku/_pages/IndexDataBuku";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/(data-buku)/data-buku/")({
  component: () => (
    <AdminLayout>
      <IndexDataBuku />
    </AdminLayout>
  ),
});
