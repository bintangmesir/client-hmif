import { Button } from "@/components/ui/button";
import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/costum/Typhography";
import { ThemeToggle } from "@/components/costum/ThemeToggle";
import AccentToggle from "@/components/costum/AccentToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignRight,
  Globe,
  House,
  Newspaper,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  Book,
} from "lucide-react";
import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

export const Navbar = () => {
  const menus = [
    {
      path: "/",
      name: "Beranda",
      icon: <House className="h-[1.2rem] w-[1.2rem]" />,
    },
    {
      path: "/artikel",
      name: "Artikel",
      icon: <Newspaper className="h-[1.2rem] w-[1.2rem]" />,
    },
    {
      path: "/buku",
      name: "Buku",
      icon: <Book className="h-[1.2rem] w-[1.2rem]" />,
    },
    {
      path: "/informationall",
      name: "Informationall",
      icon: <Globe className="h-[1.2rem] w-[1.2rem]" />,
    },
  ];
  return (
    <header className="border-b-2 border-primary py-3">
      <nav className="container flex items-center justify-between gap-4">
        <div className="flex items-center justify-start">
          <Link to={"/"}>
            <TypographyH4>hmif.org</TypographyH4>
          </Link>
        </div>
        <div className="hidden justify-between gap-6 lg:flex">
          {menus.map((menu, id) => {
            return (
              <Link key={id} to={menu.path}>
                {({ isActive }) => {
                  return (
                    <div
                      className={
                        isActive
                          ? "flex items-center justify-center gap-2 text-primary"
                          : "flex items-center justify-center gap-2 text-gray-400 hover:text-primary"
                      }
                    >
                      {menu.icon} {menu.name}
                    </div>
                  );
                }}
              </Link>
            );
          })}
        </div>
        <div className="hidden items-center justify-end gap-2 lg:flex">
          <AccentToggle />
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <AccentToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignRight className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <Link to={"/"}>
                  <SheetTitle>hmif.org</SheetTitle>
                </Link>
                <SheetDescription className="flex flex-col items-start justify-center gap-4 py-6">
                  {menus.map((menu, id) => {
                    return (
                      <Link key={id} to={menu.path}>
                        {({ isActive }) => {
                          return (
                            <div
                              className={
                                isActive
                                  ? "flex items-center justify-center gap-2 text-sm text-primary"
                                  : "flex items-center justify-center gap-2 text-sm text-black hover:text-primary dark:text-white dark:hover:text-primary"
                              }
                            >
                              {menu.icon} {menu.name}
                            </div>
                          );
                        }}
                      </Link>
                    );
                  })}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export const Footer = () => {
  const features = [
    {
      Icon: Instagram,
      name: "hmif_ftumj",
      description: "Instagram HMIF BEM FT-UMJ",
      href: "https://www.instagram.com/hmif_ftumj",
      cta: "Visit Account",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-2",
    },
    {
      Icon: Mail,
      name: "hmif@ftumj.ac.id",
      description: "Email HMIF BEM FT-UMJ",
      href: "mailto:hmif@ftumj.ac.id",
      cta: "Visit Account",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-2",
    },
    {
      Icon: Twitter,
      name: "@hmif_ftumj",
      description: "Twitter HMIF BEM FT-UMJ",
      href: "https://twitter.com/hmif_ftumj",
      cta: "Visit Account",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-1 lg:row-start-2 lg:row-end-1",
    },
    {
      Icon: Github,
      name: "hmif_ftumj",
      description: "Github HMIF BEM FT-UMJ",
      href: "https://github.com/hmifft-umj",
      cta: "Visit Account",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-1 lg:row-start-2 lg:row-end-4",
    },
    {
      Icon: Youtube,
      name: "HMIF BEM FT-UMJ",
      description: "Youtube HMIF BEM FT-UMJ",
      href: "https://www.youtube.com/channel/UCeDkRG4BrbKME3N5rG3xyYQ",
      cta: "Visit Account",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Linkedin,
      name: "HMIF BEM FT-UMJ",
      description: "Linkedin HMIF BEM FT-UMJ",
      href: "https://id.linkedin.com/in/hmifbemftumj",
      cta: "Visit Account",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <>
      <footer className="container mt-auto">
        <div className="grid grid-cols-1 items-center justify-center gap-8 overflow-hidden lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <TypographyH2 className="border-none">Lokasi :</TypographyH2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6907167473496!2d106.8699661745305!3d-6.172148960482876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f502482aca31%3A0x442225dc43c344ca!2sFakultas%20Teknik%20Universitas%20Muhammadiyah%20Jakarta!5e0!3m2!1sid!2sid!4v1718475195601!5m2!1sid!2sid"
              height={"450px"}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <TypographyP className="text-justify">
              Fakultas Teknik Universitas Muhammadiyah Jakarta Gedung D Lt.1-3,
              Jalan Cempaka Putih Tengah XXVII, Cempaka Putih, RT.11/RW.5, Cemp.
              Putih Tim., Kec. Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus
              Ibukota Jakarta 10510
            </TypographyP>
          </div>
          <div className="flex w-full flex-col justify-start gap-4">
            <BentoGrid className="lg:grid-rows-3">
              {features.map((feature, id) => (
                <BentoCard key={id} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>
      </footer>
      <div className="flex w-full items-center justify-center border-t-2 border-primary px-3 py-4 text-center">
        © Copyright HMIF BEM FT-UMJ PERIODE 2023-2024.
      </div>
    </>
  );
};

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-dvh flex-col gap-10">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default ClientLayout;
