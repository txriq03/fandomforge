"use client";
import { useDisclosure } from "@heroui/modal";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

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
  profileDrawer: Modal;
  mobileSidebar: Modal;
  openProfileModal: (profileUserId: string | null) => void;
  closeProfileModal: () => void;
  profileUserId: string | null;
  setProfileUserId: Dispatch<SetStateAction<string | null>>;
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
  const profileDrawer = useDisclosure();
  const mobileSidebar = useDisclosure();

  const [profileUserId, setProfileUserId] = useState<string | null>(null);

  const openProfileModal = (profileUserId: string | null) => {
    setProfileUserId(profileUserId);
    profileModal.onOpen();
  };

  const closeProfileModal = () => {
    setProfileUserId(null);
    profileModal.onClose();
  };

  return (
    <UIContext.Provider
      value={{
        authModal,
        profileModal,
        profileDrawer,
        mobileSidebar,
        profileUserId,
        setProfileUserId,
        openProfileModal,
        closeProfileModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;
