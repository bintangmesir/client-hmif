import Ribbon from "@/components/costum/Ribbon";
import CardDataInstagram from "@/features/data-instagram/_components/CardDataInstagram";
import CardDataInstagramById from "@/features/data-instagram/_components/CardDataInstagramById";
import ClientLayout from "@/layouts/ClientLayout";

const ArtikelInstagramGetByIdPage = () => {
  return (
    <ClientLayout>
      <Ribbon
        props={{ direction: "left", text: "INSTAGRAM HMIF BEM FT-UMJ" }}
      />
      <CardDataInstagramById />
      <Ribbon props={{ direction: "right", text: "BERITA LAINNYA" }} />
      <CardDataInstagram />
      <Ribbon props={{ direction: "left", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
};

export default ArtikelInstagramGetByIdPage;
