import CardUpdateDataAlumni from "@/features/data-alumni/_components/CardUpdateDataAlumni";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-alumni)/data-alumni/$id/edit",
)({
  component: () => UpdateDataAlumni(),
});

function UpdateDataAlumni() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardUpdateDataAlumni />
      </div>
    </AdminLayout>
  );
}
