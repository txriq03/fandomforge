import { cn } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Select, SelectItem } from "@heroui/select";
import React from "react";

const SearchMediaField = () => {
  return (
    <div className="flex gap-2">
      <SearchMediaAutoComplete className="flex-2" />
      <MediaTypeSelect className="flex-1" />
    </div>
  );
};

const MediaTypeSelect = ({ className }: { className?: string }) => {
  return (
    <Select className={cn(className)} defaultSelectedKeys={["movie"]}>
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
