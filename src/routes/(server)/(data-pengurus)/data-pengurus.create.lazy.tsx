import CardCreateDataPengurus from "@/features/data-pengurus/_components/CardCreateDataPengurus";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-pengurus)/data-pengurus/create",
)({
  component: () => CreateDataPengurus(),
});

function CreateDataPengurus() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardCreateDataPengurus />
      </div>
    </AdminLayout>
  );
}
