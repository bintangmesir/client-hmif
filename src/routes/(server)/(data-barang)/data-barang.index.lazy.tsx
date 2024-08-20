import { CardDataBarang } from "@/features/data-barang/_components/CardDataBarang";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/(server)/(data-barang)/data-barang/",
)({
  component: () => IndexDataBarang(),
});

function IndexDataBarang() {
  return (
    <AdminLayout>
      <div className="container flex items-center justify-center">
        <CardDataBarang />
      </div>
    </AdminLayout>
  );
}
