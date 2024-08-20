import { CardDataAdmin } from "@/features/data-admin/_components/CardDataAdmin";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/(data-admin)/data-admin/")({
  component: () => IndexDataAdmin(),
});

function IndexDataAdmin() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardDataAdmin />
      </div>
    </AdminLayout>
  );
}
