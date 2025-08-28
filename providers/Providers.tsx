"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SidebarProvider } from "./SidebarProvider";
import UIContextProvider from "./UIContext";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import AuthContextProvider from "./AuthContext";
import { useRouter } from "next/navigation";
import { TriviaProvider } from "./TriviaProvider";

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
          <TriviaProvider>
            <UIContextProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </UIContextProvider>
          </TriviaProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;
