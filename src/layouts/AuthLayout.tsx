import FlashMessageProvider from "@/context/flash-message-provider";
import { Navbar, Footer } from "./ClientLayout";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-dvh flex-col gap-14">
      <Navbar />
      <FlashMessageProvider>{children}</FlashMessageProvider>
      <Footer />
    </main>
  );
};

export default AuthLayout;
