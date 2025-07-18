"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SidebarProvider } from "./SidebarProvider";
import UIContextProvider from "./UIContext";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import AuthContextProvider from "./AuthContext";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const queryClient = new QueryClient();
const Providers = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ToastProvider />
          <UIContextProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </UIContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;
