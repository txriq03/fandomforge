import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import NavWrapper from "@/Components/navigation/NavWrapper";
import Topbar from "@/Components/navigation/Topbar";
import LoginModal from "@/Components/LoginModal";
import { createClient } from "@/lib/supabase/server";
import { UserProvider } from "@/providers/UserProvider";
import ProfileModal from "@/Components/profile/ProfileModal";
import ProfileDrawer from "@/Components/profile/ProfileDrawer";
import ProfileWrapper from "@/Components/profile/ProfileWrapper";

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
        <Providers>
          <UserProvider user={user}>
            <NavWrapper>
              <div className=" min-h-screen">{children}</div>
            </NavWrapper>
            <LoginModal />
            <ProfileWrapper />
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
