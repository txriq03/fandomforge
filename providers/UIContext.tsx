"use client";
import { useDisclosure } from "@heroui/react";
import { createContext, ReactNode, useContext } from "react";

interface UIContextType {
  authModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
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
  const authModal = useDisclosure();

  return (
    <UIContext.Provider value={{ authModal }}>{children}</UIContext.Provider>
  );
};

export default UIContextProvider;
