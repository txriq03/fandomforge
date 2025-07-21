import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import React from "react";
import { TbBell, TbBellFilled } from "react-icons/tb";
import { HiInbox, HiMiniInbox } from "react-icons/hi2";

const NotificationsPopover = () => {
  return (
    <Popover
      classNames={{
        content: "bg-card",
      }}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          radius="md"
          size="sm"
          className=" hidden group-data-[state=open]/sidebar:flex"
        >
          <TbBellFilled className="text-foreground/75" size={21} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <NotificationsContent />
      </PopoverContent>
    </Popover>
  );
};

const NotificationsContent = () => {
  return (
    <Card
      classNames={{
        base: "bg-card",
      }}
      className="w-[300px] h-[200px]"
    >
      <CardHeader className="flex-col items-start gap-2">
        <p className="text-xl font-main text-primary-light">Notifications</p>
        <Divider className="bg-primary/25" />
      </CardHeader>
      <CardBody className="pt-0">
        {/* Show if there are no notifications */}
        <div className="w-full h-full grid place-items-center text-center">
          <div className="flex flex-col gap-1 items-center  text-primary-light/50">
            <HiInbox size={24} />
            <p className="text-base">No notifications</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotificationsPopover;
