"use client";
import { signup } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/client";
import { login } from "@/lib/supabase/client-actions";
import { useUIContext } from "@/providers/UIContext";
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { AtSign, Lock, Mail, User2 } from "lucide-react";
import Image from "next/image";
import { unstable_rethrow } from "next/navigation";
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
                src="/login.jpg"
                className="object-cover h-full w-full "
              />
            </div>
            <div className="flex-1">
              <ModalHeader className="text-primary text-2xl font-bold font-heading">
                {showSignUp ? "Sign up" : "Welcome back"}
              </ModalHeader>
              {showSignUp ? <SignupForm /> : <LoginForm />}
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

const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Form data:", formData);
    try {
      const result = await signup(formData);
      addToast({ title: "Sign up successful!", color: "success" });
      console.log("User:", result);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      console.error("Unknown error occurred");
      addToast({ title: "Unknown error occurred.", color: "danger" });
    } finally {
      setLoading(false);
    }
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
          placeholder="Username"
          startContent={<User2 size={18} className="text-primary/50" />}
        />
        <Input
          name="email"
          isRequired
          placeholder="Email"
          type="email"
          startContent={<AtSign size={18} className="text-primary/50" />}
        />
        <Input
          name="password"
          isRequired
          placeholder="Password"
          type="password"
          startContent={<Lock size={18} className="text-primary/50" />}
        />

        <Input
          isRequired
          placeholder="Confirm Password"
          type="password"
          startContent={<Lock size={18} className="text-primary/50" />}
        />
        <Button
          fullWidth
          color="primary"
          variant="shadow"
          size="lg"
          type="submit"
          isLoading={loading}
        >
          {!loading && "Create your account"}
        </Button>
      </Form>
    </ModalBody>
  );
};

const LoginForm = () => {
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
          placeholder="Email"
          type="email"
          name="email"
          startContent={<AtSign size={18} className="text-primary/50" />}
        />

        <Input
          placeholder="Password"
          type="password"
          name="password"
          startContent={<Lock size={18} className="text-primary/50" />}
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
