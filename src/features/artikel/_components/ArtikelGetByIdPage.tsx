import Ribbon from "@/components/costum/Ribbon";
import CardDataArtikelByIdClient from "@/features/data-artikel/_components/CardDataArtikelByIdClient";
import CardDataArtikelClient from "@/features/data-artikel/_components/CardDataArtikelClient";
import ClientLayout from "@/layouts/ClientLayout";

const ArtikelGetByIdPage = () => {
  return (
    <ClientLayout>
      <Ribbon props={{ direction: "left", text: "ARTIKEL HMIF BEM FT-UMJ" }} />
      <CardDataArtikelByIdClient />
      <Ribbon props={{ direction: "right", text: "ARTIKEL LAINNYA" }} />
      <CardDataArtikelClient />
      <Ribbon props={{ direction: "left", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
};

export default ArtikelGetByIdPage;
