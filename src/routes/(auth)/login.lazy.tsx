import LoginPage from "@/features/login/_pages/LoginPage";
import AuthLayout from "@/layouts/AuthLayout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(auth)/login")({
  component: () => (
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  ),
});
