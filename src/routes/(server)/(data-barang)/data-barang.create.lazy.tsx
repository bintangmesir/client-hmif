import CardCreateDataBarang from "@/features/data-barang/_components/CardCreateDataBarang";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-barang)/data-barang/create",
)({
  component: () => CreateDataBarang(),
});

function CreateDataBarang() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardCreateDataBarang />
      </div>
    </AdminLayout>
  );
}
