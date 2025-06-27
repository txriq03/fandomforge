"use client";
import { useUIContext } from "@/providers/UIContext";
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import React, { useContext } from "react";

const LoginModal = () => {
  const { isLoginOpen, onLoginOpenChange } = useUIContext();

  return (
    <Modal isOpen={isLoginOpen} onOpenChange={onLoginOpenChange} size="3xl">
      <ModalContent>
        {(onClose) => (
          <div className="flex">
            <div className="flex-1">
              <ModalHeader className="text-primary text-2xl font-bold font-heading">
                Sign in
              </ModalHeader>
              <LoginForm />
            </div>
            <div className="flex-1 hidden sm:block">
              <Image src="/abstract.jpg" radius="none" />
            </div>
            {/* <ModalHeader className="text-primary text-base sm:text-2xl">
              Sign in
            </ModalHeader> */}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

const LoginForm = () => {
  return <ModalBody>Test</ModalBody>;
};

export default LoginModal;
