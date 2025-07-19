"use client";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import React from "react";

const ReviewMessageBox = () => {
  const user = useUser();

  if (!user) return <NoAuthBox />;

  return <p>Reviews</p>;
};

const NoAuthBox = () => {
  return (
    <Card
      className="bg-black/15 border-primary border-1 border-dashed py-2"
      shadow="none"
    >
      <CardBody className="items-center space-y-3">
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
