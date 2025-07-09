"use client";
import { Modal, ModalContent, Spinner } from "@heroui/react";

const ProfileModal = () => {
  return (
    <Modal
      isOpen={isLoginOpen}
      onOpenChange={onLoginOpenChange}
      size="2xl"
      className="font-main"
    >
      <ModalContent>{(onClose) => <div className="flex "></div>}</ModalContent>
    </Modal>
  );
};

export default ProfileModal;
