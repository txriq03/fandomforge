import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import NavWrapper from "@/Components/navigation/NavWrapper";
import LoginModal from "@/Components/LoginModal";
import { createClient } from "@/lib/supabase/server";
import { UserProvider } from "@/providers/UserProvider";
import ProfileWrapper from "@/Components/profile/ProfileWrapper";
import NextTopLoader from "nextjs-toploader";
import UserDrawer from "@/Components/user-drawer/UserDrawer";
import MobileSidebar from "@/Components/sidebar/MobileSidebar";
import TriviaModal from "@/Components/modals/TriviaModal";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FandomForge",
  description: "Where fan knowledge is forged and tested.",
  authors: [{ name: "Tariq", url: "https://github.com/txriq03" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html
      lang="en"
      className={`bg-background ${poppins.variable} ${quicksand.variable}`}
    >
      <body className={`antialiased dark bg-background text-foreground`}>
        <NextTopLoader color="#818cf8" />
        <Providers>
          <UserProvider user={user}>
            <NavWrapper>
              <div className=" min-h-screen">{children}</div>
            </NavWrapper>
            {/* Modals and Drawers*/}
            <LoginModal />
            <ProfileWrapper /> {/* Contains ProfileModal and ProfileDrawer */}
            <UserDrawer />
            <MobileSidebar />
            <TriviaModal />
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
