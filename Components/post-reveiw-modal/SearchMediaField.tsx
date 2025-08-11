import { useSearch } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";
import { MediaType } from "@/types/trending";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Select, SelectItem } from "@heroui/select";
import React, { Dispatch, useEffect, useState } from "react";

const SearchMediaField = () => {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  return (
    <div className="flex gap-2">
      <SearchMediaAutoComplete className="flex-2" mediaType={mediaType} />
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
  mediaType,
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

const SearchMediaAutoComplete = ({
  className,
  mediaType,
}: {
  className?: string;
  mediaType: MediaType;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const { data, isFetching } = useSearch(debouncedValue, mediaType);

  const results = data?.results;

  // Debounce effect: waits 300ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue]);

  return (
    <Autocomplete
      className={cn(className)}
      placeholder="Type to search..."
      isLoading={isFetching}
      onInputChange={setSearchValue}
    >
      {results?.map((item: any) => (
        <AutocompleteItem key={item.id}>
          {"title" in item ? item.title : item.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

const MediaAutocompleteCard = () => {};
export default SearchMediaField;
