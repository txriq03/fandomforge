import { cn } from "@/lib/utils";
import { MediaType } from "@/types/trending";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Select, SelectItem } from "@heroui/select";
import React, { Dispatch, useState } from "react";

const SearchMediaField = () => {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  return (
    <div className="flex gap-2">
      <SearchMediaAutoComplete className="flex-2" />
      <MediaTypeSelect
        className="flex-1"
        mediaType={mediaType}
        setMediaType={setMediaType}
      />
    </div>
  );
};

const MediaTypeSelect = ({
  className,
  mediaType = "movie",
  setMediaType,
}: {
  className?: string;
  mediaType: MediaType;
  setMediaType: Dispatch<React.SetStateAction<MediaType>>;
}) => {
  return (
    <Select
      className={cn(className)}
      defaultSelectedKeys={["movie"]}
      value={mediaType}
      onChange={(e) => setMediaType(e.target.value as MediaType)}
    >
      <SelectItem key="movie">Movie</SelectItem>
      <SelectItem key="tv">TV</SelectItem>
    </Select>
  );
};

const SearchMediaAutoComplete = ({ className }: { className?: string }) => {
  return (
    <Autocomplete className={cn(className)} placeholder="Type to search...">
      <AutocompleteItem>In Development</AutocompleteItem>
    </Autocomplete>
  );
};

export default SearchMediaField;
