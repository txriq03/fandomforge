"use client";
import { login, signup } from "@/lib/supabase/actions";
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
            <div className="flex-1 ">
              <ModalHeader className="text-primary text-2xl font-bold font-heading">
                {showSignUp ? "Create an Account" : "Welcome back"}
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
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Form data:", formData);
    try {
      const result = await signup(formData);
      addToast({ title: "Sign up successful!" });
      console.log("User:", result);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      console.error("Unknown error occurred");
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
          placeholder="Username"
          startContent={<User2 size={18} className="text-primary/50" />}
          validate={(value) => {
            if (value.length < 3) {
              return "Username must be at least 3 characters long.";
            }
          }}
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
          {!loading && "Sign up"}
        </Button>
      </Form>
    </ModalBody>
  );
};

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Form data:", formData);
    try {
      const result = await login(formData);
      alert("Signup successful!");
      console.log("User:", result);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      addToast({ title: "Unknown error occurred." });
      console.error("Unknown error occurred.");
    } finally {
      setLoading(false);
    }
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
          isLoading={loading}
        >
          {!loading && "Login"}
        </Button>
      </Form>
    </ModalBody>
  );
};

export default LoginModal;
