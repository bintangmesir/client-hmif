import CardCreateDataAlumni from "@/features/data-alumni/_components/CardCreateDataAlumni";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-alumni)/data-alumni/create",
)({
  component: () => CreateDataAlumni(),
});

function CreateDataAlumni() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardCreateDataAlumni />
      </div>
    </AdminLayout>
  );
}
