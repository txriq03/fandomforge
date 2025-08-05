import { sendGlobalMessage } from "@/lib/supabase/actions";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import React, { useState } from "react";
import { TbMoodSmile, TbSend } from "react-icons/tb";

const MessageBox = () => {
  const iconSize = 18;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);

    try {
      const data = await sendGlobalMessage(message);
      setMessage("");
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
    <div className="flex gap-2">
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
        onPress={sendMessage}
        isLoading={loading}
      >
        <TbSend size={iconSize} />
      </Button>
    </div>
  );
};

export default MessageBox;
