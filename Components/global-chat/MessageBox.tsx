import { sendGlobalMessage } from "@/lib/supabase/actions";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { TbMoodSmile, TbSend } from "react-icons/tb";

const MessageBox = () => {
  const iconSize = 18;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setLoading(true);

    try {
      await sendGlobalMessage(message);
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["global_messages"] });
    } catch (err) {
      if (err instanceof Error) {
        addToast({
          title: "Error",
          description: err.message,
          color: "danger",
        });
      } else {
        addToast({
          title: "Unknown Error",
          description: "An unexpected error occurred.",
          color: "danger",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="flex gap-2 flex-row" onSubmit={sendMessage}>
      {/* Input field */}
      <Input
        value={message}
        onValueChange={setMessage}
        name="message"
        placeholder="Type your message"
        classNames={{
          inputWrapper:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
          input: "placeholder:text-slate-500",
        }}
      />

      {/* Buttons */}
      <Button isIconOnly color="primary" variant="ghost">
        <TbMoodSmile size={iconSize} />
      </Button>
      <Button
        isIconOnly
        color="primary"
        isDisabled={message.trim() === ""}
        isLoading={loading}
        type="submit"
      >
        <TbSend size={iconSize} />
      </Button>
    </Form>
  );
};

export default MessageBox;
