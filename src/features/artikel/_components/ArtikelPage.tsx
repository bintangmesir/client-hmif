import Ribbon from "@/components/costum/Ribbon";
import CardDataArtikelClient from "@/features/data-artikel/_components/CardDataArtikelClient";
import CardDataInstagram from "@/features/data-instagram/_components/CardDataInstagram";
import CardDataYoutubeClient from "@/features/data-youtube/_components/CardDataYoutubeClient";
import ClientLayout from "@/layouts/ClientLayout";

const ArtikelPage = () => {
  return (
    <ClientLayout>
      <Ribbon props={{ direction: "left", text: "YOUTUBE HMIF BEM FT-UMJ" }} />
      <CardDataYoutubeClient />
      <Ribbon props={{ direction: "right", text: "ARTIKEL TERBARU" }} />
      <CardDataArtikelClient />
      <Ribbon
        props={{ direction: "left", text: "INSTAGRAM HMIF BEM FT-UMJ" }}
      />
      <CardDataInstagram />
      <Ribbon props={{ direction: "right", text: "SOCIAL MEDIA" }} />
    </ClientLayout>
  );
};

export default ArtikelPage;
