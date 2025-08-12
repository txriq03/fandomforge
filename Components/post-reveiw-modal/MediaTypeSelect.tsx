import { cn } from "@/lib/utils";
import { MediaType } from "@/types/trending";
import { Select, SelectItem } from "@heroui/select";
import React, { Dispatch } from "react";

const MediaTypeSelect = ({
  className,
  setMediaType,
}: {
  className?: string;
  setMediaType: Dispatch<React.SetStateAction<MediaType>>;
}) => {
  return (
    <Select
      className={cn(className)}
      name="mediaType"
      defaultSelectedKeys={["movie"]}
      onChange={(e) => setMediaType(e.target.value as MediaType)}
      aria-label="Select Media Type"
    >
      <SelectItem key="movie">Movie</SelectItem>
      <SelectItem key="tv">TV</SelectItem>
    </Select>
  );
};

export default MediaTypeSelect;
