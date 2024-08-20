import CardCreateDataBuku from "@/features/data-buku/_components/CardCreateDataBuku";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-buku)/data-buku/create",
)({
  component: () => CreateDataBuku(),
});

function CreateDataBuku() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardCreateDataBuku />
      </div>
    </AdminLayout>
  );
}
