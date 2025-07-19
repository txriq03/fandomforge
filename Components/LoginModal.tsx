"use client";
import { login, signup } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { useUIContext } from "@/providers/UIContext";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";

import { useMutation } from "@tanstack/react-query";
import { AtSign, Lock, User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const LoginModal = () => {
  const { authModal } = useUIContext();
  const [showSignUp, toggleShowSignUp] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Modal
      isOpen={authModal.isOpen}
      onOpenChange={authModal.onOpenChange}
      size="2xl"
      className="font-main"
    >
      <ModalContent>
        {(onClose) => (
          <div className="flex ">
            <div className="flex-1 h-[400px] hidden sm:block w-full relative">
              {!imageLoaded && (
                <Spinner
                  variant="simple"
                  color="primary"
                  className="w-full h-full m-auto"
                  size="lg"
                />
              )}

              <Image
                fill
                alt="login image"
                src="/login.jpg"
                className={cn(
                  "object-cover h-full w-full transition-opacity opacity-0",
                  imageLoaded && "opacity-100"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
            </div>
            <div className="flex-1">
              <ModalHeader className="text-primary dark:text-primary-light text-2xl font-bold font-heading">
                {showSignUp ? "Sign up" : "Welcome back"}
              </ModalHeader>
              {showSignUp ? (
                <SignupForm onClose={onClose} />
              ) : (
                <LoginForm onClose={onClose} />
              )}
              <ModalFooter className="flex flex-row items-center gap-1 text-sm justify-start pt-0 ">
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

const SignupForm = ({ onClose }: { onClose: () => void }) => {
  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return signup(formData);
    },
    onSuccess: () => {
      addToast({
        title: "Account created!",
        color: "primary",
        variant: "solid",
      });
      onClose();
    },
    onError: (error) => {
      addToast({
        title: "Error creating account.",
        description: error.message,
        color: "danger",
        variant: "solid",
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(new FormData(e.currentTarget));
  };
  return (
    <ModalBody>
      <Form onSubmit={onSubmit}>
        <Input
          name="username"
          isRequired
          minLength={3}
          maxLength={20}
          pattern="^[a-zA-Z0-9]+$"
          errorMessage={({ validationDetails, validationErrors }) => {
            if (validationDetails.patternMismatch) {
              return "Username can only contain alphanumeric characters.";
            }

            return validationErrors;
          }}
          placeholder="Username"
          startContent={
            <User2 size={18} className="text-primary/50 dark:text-primary" />
          }
        />
        <Input
          name="email"
          isRequired
          placeholder="Email"
          type="email"
          startContent={
            <AtSign size={18} className="text-primary/50 dark:text-primary" />
          }
        />
        <Input
          name="password"
          isRequired
          placeholder="Password"
          type="password"
          startContent={
            <Lock size={18} className="text-primary/50 dark:text-primary" />
          }
        />

        <Input
          isRequired
          placeholder="Confirm Password"
          type="password"
          startContent={
            <Lock size={18} className="text-primary/50 dark:text-primary" />
          }
          validate={(value) => {
            const password = document.querySelector<HTMLInputElement>(
              'input[name="password"]'
            );
            if (password && value !== password.value) {
              return "Passwords do not match.";
            }
          }}
        />
        <Button
          fullWidth
          color="primary"
          variant="shadow"
          size="lg"
          type="submit"
          isLoading={mutation.isPending}
        >
          {!mutation.isPending && "Create your account"}
        </Button>
      </Form>
    </ModalBody>
  );
};

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return login(formData);
    },
    onSuccess: () => {
      addToast({
        title: "You're logged in",
        color: "primary",
        variant: "solid",
      });
      onClose();
    },
    onError: (error) => {
      addToast({
        title: "Error logging in.",
        description: error.message,
        color: "danger",
        variant: "solid",
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(new FormData(e.currentTarget));
  };
  return (
    <ModalBody>
      <Form onSubmit={onSubmit}>
        <Input
          isRequired
          placeholder="Email"
          type="email"
          name="email"
          startContent={
            <AtSign size={18} className="text-primary/50 dark:text-primary" />
          }
        />

        <Input
          isRequired
          placeholder="Password"
          type="password"
          name="password"
          startContent={
            <Lock size={18} className="text-primary/50 dark:text-primary" />
          }
        />
        <Button
          fullWidth
          color="primary"
          variant="shadow"
          size="lg"
          type="submit"
          isLoading={mutation.isPending}
        >
          {!mutation.isPending && "Login"}
        </Button>
      </Form>
    </ModalBody>
  );
};

export default LoginModal;
