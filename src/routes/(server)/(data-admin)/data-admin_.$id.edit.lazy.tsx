import CardResetPasswordDataAdmin from "@/features/data-admin/_components/CardResetPasswordDataAdmin";
import CardUpdateDataAdmin from "@/features/data-admin/_components/CardUpdateDataAdmin";
import CardUpdatePasswordDataAdmin from "@/features/data-admin/_components/CardUpdatePasswordDataAdmin";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-admin)/data-admin/$id/edit",
)({
  component: () => EditDataAdmin(),
});

function EditDataAdmin() {
  return (
    <AdminLayout>
      <div className="container grid grid-cols-1 items-start justify-center gap-4 lg:grid-cols-2">
        <div className="flex h-full w-full items-start justify-center">
          <CardUpdateDataAdmin />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <CardUpdatePasswordDataAdmin />
          <CardResetPasswordDataAdmin />
        </div>
      </div>
    </AdminLayout>
  );
}
