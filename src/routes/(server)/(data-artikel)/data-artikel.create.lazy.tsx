import CardCreateDataArtikel from "@/features/data-artikel/_components/CardCreateDataArtikel";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-artikel)/data-artikel/create",
)({
  component: () => CreateDataArtikel(),
});

function CreateDataArtikel() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardCreateDataArtikel />
      </div>
    </AdminLayout>
  );
}
