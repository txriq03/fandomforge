"use client";
import { useUIContext } from "@/providers/UIContext";
import { Modal, ModalContent, ModalHeader } from "@heroui/react";

const ProfileModal = () => {
  const { profileModal } = useUIContext();
  return (
    <Modal
      isOpen={profileModal.isOpen}
      onOpenChange={profileModal.onOpenChange}
      size="2xl"
      className="font-main"
    >
      <ModalHeader></ModalHeader>
      <ModalContent>{(onClose) => <div className="flex "></div>}</ModalContent>
    </Modal>
  );
};

export default ProfileModal;
