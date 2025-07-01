"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SidebarProvider } from "./SidebarProvider";
import UIContextProvider from "./UIContext";
import { ToastProvider } from "@heroui/react";
import AuthContextProvider from "./AuthContext";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastProvider />
        <UIContextProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </UIContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
