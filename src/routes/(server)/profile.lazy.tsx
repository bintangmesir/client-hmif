import CardProfile from "@/features/profile/_components/CardProfile";
import CardUpdatePassword from "@/features/profile/_components/CardUpdatePassword";
import AdminLayout from "@/layouts/AdminLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(server)/profile")({
  component: () => ProfilePage(),
});

function ProfilePage() {
  return (
    <AdminLayout>
      <div className="container grid grid-cols-1 items-start justify-center gap-4 lg:grid-cols-2">
        <div className="flex h-full w-full items-start justify-center">
          <CardProfile />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <CardUpdatePassword />
        </div>
      </div>
    </AdminLayout>
  );
}
