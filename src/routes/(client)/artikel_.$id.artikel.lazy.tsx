import { createLazyFileRoute } from "@tanstack/react-router";
import ArtikelGetByIdPage from "@/features/artikel/_components/ArtikelGetByIdPage";

export const Route = createLazyFileRoute("/(client)/artikel/$id/artikel")({
  component: () => ArtikelGetByIdPage(),
});
