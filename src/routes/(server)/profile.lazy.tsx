import ProfilePage from "@/features/profile/_pages/ProfilePage";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/profile")({
  component: () => (
    <AdminLayout>
      <ProfilePage />
    </AdminLayout>
  ),
});
