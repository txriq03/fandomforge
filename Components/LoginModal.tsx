"use client";
import { useUIContext } from "@/providers/UIContext";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { AtSign, Lock, Mail, User2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";

const LoginModal = () => {
  const { isLoginOpen, onLoginOpenChange } = useUIContext();
  const [showSignUp, toggleShowSignUp] = useState(false);

  return (
    <Modal
      isOpen={isLoginOpen}
      onOpenChange={onLoginOpenChange}
      size="2xl"
      className="font-main"
    >
      <ModalContent>
        {(onClose) => (
          <div className="flex">
            <div className="flex-1 h-[400px] hidden sm:block w-full relative">
              <Image
                fill
                alt="login image"
                src="/abstract.jpg"
                className="object-cover h-full w-full "
              />
            </div>
            <div className="flex-1 ">
              <ModalHeader className="text-primary text-2xl font-bold font-heading">
                {showSignUp ? "Sign up" : "Sign in"}
              </ModalHeader>
              {showSignUp ? <SignupForm /> : <LoginForm />}
              <ModalFooter className="flex flex-row items-center gap-1 text-sm justify-start pt-0">
                {" "}
                {showSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <Button
                  variant="light"
                  size="sm"
                  className="text-sm"
                  color="primary"
                  onPress={() => toggleShowSignUp(!showSignUp)}
                >
                  {" "}
                  {showSignUp ? "Sign in!" : "Sign up!"}
                </Button>
              </ModalFooter>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

const SignupForm = () => {
  return (
    <ModalBody>
      <Input
        placeholder="Username"
        startContent={<User2 size={18} className="text-primary/50" />}
      />
      <Input
        placeholder="Email"
        type="email"
        startContent={<AtSign size={18} className="text-primary/50" />}
      />
      <Input
        placeholder="Password"
        type="password"
        startContent={<Lock size={18} className="text-primary/50" />}
      />

      <Input
        placeholder="Confirm Password"
        type="password"
        startContent={<Lock size={18} className="text-primary/50" />}
      />
      <Button fullWidth color="primary" variant="shadow" size="lg">
        Login
      </Button>
    </ModalBody>
  );
};

const LoginForm = () => {
  return (
    <ModalBody>
      <Input
        placeholder="Email"
        type="email"
        startContent={<AtSign size={18} className="text-primary/50" />}
      />

      <Input
        placeholder="Password"
        type="password"
        startContent={<Lock size={18} className="text-primary/50" />}
      />
      <Button fullWidth color="primary" variant="shadow" size="lg">
        Login
      </Button>
    </ModalBody>
  );
};

export default LoginModal;
