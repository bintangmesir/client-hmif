import { TypographyH1 } from "@/components/costum/Typhography";
import ClientLayout from "@/layouts/ClientLayout";

function InformationallPage() {
  const bgUrl =
    "https://images.unsplash.com/photo-1669780080364-515ad92d9911?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <ClientLayout>
      <section
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="container flex min-h-dvh items-center justify-center"
      >
        <TypographyH1 className="text-white drop-shadow-2xl">
          Comming Soon!
        </TypographyH1>
      </section>
    </ClientLayout>
  );
}

export default InformationallPage;
