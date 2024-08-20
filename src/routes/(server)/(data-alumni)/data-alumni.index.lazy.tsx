import { CardDataAlumni } from "@/features/data-alumni/_components/CardDataAlumni";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-alumni)/data-alumni/",
)({
  component: () => IndexDataAlumni(),
});

function IndexDataAlumni() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardDataAlumni />
      </div>
    </AdminLayout>
  );
}
