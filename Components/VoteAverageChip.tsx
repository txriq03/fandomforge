import { Chip } from "@heroui/react";
import { Star } from "lucide-react";
import React from "react";
import { FaStar } from "react-icons/fa";

const VoteAverageChip = ({ value }: { value: number }) => {
  return (
    <Chip
      color="primary"
      size="sm"
      radius="sm"
      className="font-bold p-1"
      startContent={<FaStar className="text-amber-300" size={15} />}
    >
      {value.toFixed(1)}
    </Chip>
  );
};

export default VoteAverageChip;
