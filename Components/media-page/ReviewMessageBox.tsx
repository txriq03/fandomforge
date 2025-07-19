"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import React, { useState } from "react";
import { TbStar, TbStarFilled } from "react-icons/tb";

const ReviewMessageBox = () => {
  const user = useUser();
  const isMobile = useIsMobile();
  const [stars, setStars] = useState(0);

  if (!user) return <NoAuthBox />;

  const handleStars = (index: number) => {
    setStars(index);
  };
  return (
    <div>
      <Textarea
        label="Write your review"
        placeholder="What did you think?"
        classNames={{
          mainWrapper: "hover:bg-white",
          inputWrapper:
            "bg-black/5 hover:bg-white/5 data-focus:bg-black/10 border-primary/25 border-1",
        }}
      />
      <div className="flex justify-between py-2 items-start">
        <div className="flex gap-1 ">
          {[...Array(5)].map((_, index: number) => {
            const starNum = index + 1;
            if (stars >= starNum) {
              return (
                <button onClick={() => handleStars(starNum)}>
                  <TbStarFilled
                    size={isMobile ? 21 : 24}
                    className="text-yellow-400 cursor-pointer"
                  />
                </button>
              );
            }
            return (
              <button
                onClick={() => handleStars(starNum)}
                className="cursor-pointer"
              >
                <TbStar size={isMobile ? 21 : 24} />
              </button>
            );
          })}
        </div>
        <Button
          color="primary"
          radius="sm"
          size={isMobile ? "sm" : "md"}
          isDisabled
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

const NoAuthBox = () => {
  const { authModal } = useUIContext();

  return (
    <Card
      className="bg-black/15 border-primary border-1 border-dashed py-2"
      shadow="none"
    >
      <CardBody className="items-center space-y-3 text-center">
        <p className="text-primary-light text-sm sm:text-base">
          You need to be logged in to post a review.
        </p>
        <Button
          color="primary"
          className="min-w-[200px]"
          onPress={authModal.onOpen}
        >
          Sign in
        </Button>
      </CardBody>
    </Card>
  );
};
export default ReviewMessageBox;
