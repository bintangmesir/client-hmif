import ArtikelInstagramGetByIdPage from "@/features/artikel/_components/ArtikelInstagramGetByIdPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(client)/artikel/$id/instagram")({
  component: () => ArtikelInstagramGetByIdPage(),
});
