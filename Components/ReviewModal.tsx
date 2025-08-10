import { useUIContext } from "@/providers/UIContext";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React from "react";
import { TbPlus } from "react-icons/tb";

const ReviewModal = () => {
  const { reviewModal } = useUIContext();
  return (
    <>
      <Trigger onOpen={reviewModal.onOpen} />
      <Modal
        isOpen={reviewModal.isOpen}
        onOpenChange={reviewModal.onOpenChange}
        className="font-main"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-heading font-bold text-xl">
                Post a review
              </ModalHeader>
              <ModalBody>
                <Alert
                  description="This section is currently in development. Come back again later!"
                  color="warning"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" fullWidth onPress={reviewModal.onClose}>
                  Okay!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const Trigger = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Button
      isIconOnly
      radius="lg"
      size="lg"
      color="primary"
      onPress={onOpen}
      className="absolute bottom-0 right-0 m-5 z-1 fixed"
    >
      <TbPlus size={32} />
    </Button>
  );
};

const ReviewForm = () => {
  return <p>Content</p>;
};

export default ReviewModal;
