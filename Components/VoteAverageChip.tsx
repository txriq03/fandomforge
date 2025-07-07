import { Chip } from "@heroui/react";
import { Star } from "lucide-react";
import React from "react";
import { FaStar } from "react-icons/fa";

const VoteAverageChip = ({ value }: { value: number }) => {
  return (
    <Chip
      color="primary"
      size="sm"
      radius="md"
      className="font-bold pl-2"
      startContent={<FaStar className="text-amber-300" size={18} />}
    >
      {value.toFixed(1)}
    </Chip>
  );
};

export default VoteAverageChip;
