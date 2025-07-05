"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Bell, PackageOpen } from "lucide-react";
import React from "react";

const Notifications = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          isIconOnly
          radius="full"
          className="p-2.5 "
          color="primary"
          variant="solid"
        >
          <Bell />
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
    <Card className="w-[300px]" radius="md">
      <CardBody className="text-center items-center gap-2 text-primary-light/75">
        <PackageOpen />
        <p className="text-lg">No Notifications</p>
      </CardBody>
    </Card>
  );
};
export default Notifications;
