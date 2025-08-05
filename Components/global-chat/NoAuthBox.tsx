import useIsMobile from "@/hooks/useIsMobile";
import { useUIContext } from "@/providers/UIContext";
import { Button } from "@heroui/button";
import React from "react";

const NoAuthBox = () => {
  const isMobile = useIsMobile();
  const { authModal } = useUIContext();
  return (
    <div className="border-1 border-dashed border-primary rounded-lg px-2 py-4 flex justify-center flex-col gap-2 items-center">
      <p className="text-primary-light/50 text-sm md:text-sm">
        Join the conversation
      </p>
      <Button
        color="primary"
        className="px-20"
        size={"sm"}
        onPress={authModal.onOpen}
      >
        Sign in
      </Button>
    </div>
  );
};

export default NoAuthBox;
