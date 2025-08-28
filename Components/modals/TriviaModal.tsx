"use client";

import { useUIContext } from "@/providers/UIContext";
import { Modal, ModalContent } from "@heroui/modal";

const TriviaModal = () => {
  const { triviaModal } = useUIContext();

  return (
    <Modal>
      <ModalContent>{(onClose) => <></>}</ModalContent>
    </Modal>
  );
};

export default TriviaModal;
