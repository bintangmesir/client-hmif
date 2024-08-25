import AdminLayout from "@/layouts/AdminLayout";
import { IndexDataAdmin } from "@/features/data-admin/_pages/IndexDataAdmin";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/(data-admin)/data-admin/")({
  component: () => (
    <AdminLayout>
      <IndexDataAdmin />
    </AdminLayout>
  ),
});
