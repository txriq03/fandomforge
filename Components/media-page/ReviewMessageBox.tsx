"use client";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import React from "react";

const ReviewMessageBox = () => {
  const user = useUser();

  if (!user) return <NoAuthBox />;

  return (
    <div>
      <Textarea
        label="Write your review"
        placeholder="Tell us how you feel"
        classNames={{
          mainWrapper: "hover:bg-white",
          inputWrapper:
            "bg-black/5 hover:bg-white/5 data-focus:bg-black/10 border-primary/25 border-1",
        }}
      />
    </div>
  );
};

const NoAuthBox = () => {
  return (
    <Card
      className="bg-black/15 border-primary border-1 border-dashed py-2"
      shadow="none"
    >
      <CardBody className="items-center space-y-3 text-center">
        <p className="text-primary-light">
          You need to be logged in to post a review.
        </p>
        <Button color="primary" className="min-w-[200px]">
          Sign in
        </Button>
      </CardBody>
    </Card>
  );
};
export default ReviewMessageBox;
