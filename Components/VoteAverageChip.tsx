import { Chip } from "@heroui/react";
import { Star } from "lucide-react";
import React from "react";

const VoteAverageChip = ({ value }: { value: number }) => {
  return (
    <Chip
      color="primary"
      radius="md"
      className="font-bold"
      startContent={<Star className="text-amber-300" size={18} />}
    >
      {value.toFixed(1)}
    </Chip>
  );
};

export default VoteAverageChip;
