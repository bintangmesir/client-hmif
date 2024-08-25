import { createLazyFileRoute } from "@tanstack/react-router";
import BerandaPage from "@/features/beranda/_pages/BerandaPage";

export const Route = createLazyFileRoute("/(client)/")({
  component: () => BerandaPage(),
});
