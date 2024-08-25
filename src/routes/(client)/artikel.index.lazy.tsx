import ArtikelPage from "@/features/artikel/_components/ArtikelPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/artikel/")({
  component: () => ArtikelPage(),
});
