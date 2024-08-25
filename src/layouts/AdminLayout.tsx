import AccentToggle from "@/components/costum/AccentToggle";
import { ThemeToggle } from "@/components/costum/ThemeToggle";
import { TypographyH4 } from "@/components/costum/Typhography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthProvider, { useAuthUserContext } from "@/context/auth-provider";
import FlashMessageProvider from "@/context/flash-message-provider";
import { postLogout } from "@/services/auth";
import { stringTransformToWhiteSpace } from "@/utils/stringTransformToWhiteSpace";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlignLeft,
  Book,
  Box,
  Building2,
  Gauge,
  Loader,
  LogOut,
  Newspaper,
  UserRound,
  UserRoundCog,
  UsersRound,
  Youtube,
} from "lucide-react";
import { ReactNode } from "react";
import { useMutation } from "react-query";

const menus = [
  {
    path: "/dashboard",
    name: "Dashboard",
    role: [],
    icon: <Gauge className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/profile",
    name: "Profile",
    role: [],
    icon: <UserRound className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-admin",
    name: "Data Admin",
    role: ["super_admin", "kadep_kominfo", "kadep_prhp"],
    icon: <UserRoundCog className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-himpunan",
    name: "Data Himpunan",
    role: ["kadep_kominfo", "staff_kominfo"],
    icon: <Building2 className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-pengurus",
    name: "Data Pengurus",
    role: ["kadep_kominfo", "staff_kominfo"],
    icon: <UsersRound className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-artikel",
    name: "Data Artikel",
    role: ["kadep_kominfo", "staff_kominfo"],
    icon: <Newspaper className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-youtube",
    name: "Data Youtube",
    role: ["kadep_kominfo", "staff_kominfo"],
    icon: <Youtube className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-barang",
    name: "Data Barang",
    role: ["kadep_prhp", "staff_prhp"],
    icon: <Box className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-alumni",
    name: "Data Alumni",
    role: ["kadep_prhp", "staff_prhp"],
    icon: <UsersRound className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    path: "/data-buku",
    name: "Data Buku",
    role: ["kadep_prhp", "staff_prhp"],
    icon: <Book className="h-[1.2rem] w-[1.2rem]" />,
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthUserContext();

  const { isLoading, mutateAsync: postLogOutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: postLogout,
  });

  return (
    user && (
      <header className="border-b-2 border-primary py-3">
        <nav className="container flex items-center justify-between gap-4">
          <div className="flex items-center justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignLeft className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <Link
                    to={"/"}
                    className="flex w-full items-center justify-start gap-3"
                  >
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.data.fotoProfile
                            ? `${import.meta.env.VITE_APP_FILE_SERVER}/admin/${user?.data.id}/${user?.data.fotoProfile}`
                            : `https://ui-avatars.com/api/?name=${user?.data.name}`
                        }
                        alt={user?.data.name}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <SheetTitle>{user?.data.name}</SheetTitle>
                  </Link>
                  <SheetDescription className="capitalize">
                    Role :{" "}
                    {stringTransformToWhiteSpace(user?.data.role as string)}
                  </SheetDescription>
                  <div className="flex flex-col items-start justify-center gap-6 py-6">
                    {menus
                      .filter(
                        (menu) =>
                          menu.role.length < 1 ||
                          menu.role.find((role) => role === user?.data.role),
                      )
                      .map((menu, id) => {
                        return (
                          <Link key={id} to={menu.path}>
                            {({ isActive }) => {
                              return (
                                <div
                                  className={
                                    isActive
                                      ? "flex items-center justify-center gap-2 text-primary"
                                      : "flex items-center justify-center gap-2 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                                  }
                                >
                                  {menu.icon} {menu.name}
                                </div>
                              );
                            }}
                          </Link>
                        );
                      })}
                    {!isLoading ? (
                      <Button
                        variant={"destructive"}
                        className="flex w-full items-center"
                        onClick={async () => {
                          try {
                            await postLogOutMutation();
                          } catch (e) {
                            console.error(e);
                          }
                          navigate({ to: "/" });
                        }}
                      >
                        <LogOut className="mr-1" size={16} /> Logout
                      </Button>
                    ) : (
                      <Button
                        className="flex w-full items-center justify-center"
                        disabled
                      >
                        <Loader className="mr-2 animate-spin" /> Loading
                      </Button>
                    )}
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex justify-between gap-4">
            <Link to={"/"}>
              <TypographyH4>hmif.org</TypographyH4>
            </Link>
          </div>
          <div className="flex items-center justify-end gap-2">
            <AccentToggle />
            <ThemeToggle />
          </div>
        </nav>
      </header>
    )
  );
};

const Footer = () => {
  return (
    <footer className="mt-auto flex w-full items-center justify-center border-t-2 border-primary p-4 text-center">
      © Copyright HMIF BEM FT-UMJ PERIODE 2023-2024.
    </footer>
  );
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <main className="flex min-h-dvh flex-col gap-4">
        <Navbar />
        <FlashMessageProvider>{children}</FlashMessageProvider>
        <Footer />
      </main>
    </AuthProvider>
  );
};

export default AdminLayout;
