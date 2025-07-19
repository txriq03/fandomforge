"use client";
import { useDisclosure } from "@heroui/modal";
import { createContext, ReactNode, useContext } from "react";

type Modal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

interface UIContextType {
  authModal: Modal;
  profileModal: Modal;
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
  const profileModal = useDisclosure();

  return (
    <UIContext.Provider value={{ authModal, profileModal }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;
