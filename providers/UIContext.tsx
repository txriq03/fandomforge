"use client";
import { useDisclosure } from "@heroui/react";
import { createContext, ReactNode, useContext } from "react";

interface UIContextType {
  isLoginOpen: any;
  onLoginOpen: any;
  onLoginOpenChange: any;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIContextProvider.");
  }
  return context;
};

const UIContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onOpenChange: onLoginOpenChange,
  } = useDisclosure();
  return (
    <UIContext.Provider value={{ isLoginOpen, onLoginOpen, onLoginOpenChange }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;
