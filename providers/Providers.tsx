"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SidebarProvider } from "./SidebarProvider";
import UIContextProvider from "./UIContext";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UIContextProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </UIContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
