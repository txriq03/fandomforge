import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React from "react";
import { TbMoodSmile, TbSend } from "react-icons/tb";

const MessageBox = () => {
  const iconSize = 18;
  return (
    <div className="flex gap-2">
      {/* Input field */}
      <Input
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
      <Button isIconOnly color="primary">
        <TbSend size={iconSize} />
      </Button>
    </div>
  );
};

export default MessageBox;
