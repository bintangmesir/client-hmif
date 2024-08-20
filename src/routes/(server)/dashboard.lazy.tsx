import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/dashboard")({
  component: () => DashboardPage(),
});

function DashboardPage() {
  return (
    <AdminLayout>
      <div>Hello /_server/dashboard!</div>
    </AdminLayout>
  );
}
