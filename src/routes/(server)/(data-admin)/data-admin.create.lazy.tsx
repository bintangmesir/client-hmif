import CardCreateDataAdmin from "@/features/data-admin/_components/CardCreateDataAdmin";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-admin)/data-admin/create",
)({
  component: () => CreateDataAdmin(),
});

function CreateDataAdmin() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardCreateDataAdmin />
      </div>
    </AdminLayout>
  );
}
