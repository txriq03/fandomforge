import { useSearch } from "@/hooks/useSearch";
import { getImageUrl } from "@/lib/api/tmdb";
import { cn, devLog, formatDate } from "@/lib/utils";
import { middleware } from "@/middleware";
import { SearchMovieResult, SearchTVResult } from "@/types/tmdb";
import { MediaType } from "@/types/trending";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Image } from "@heroui/image";
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
      aria-label="Select Media Type"
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
      aria-label="Search Movies or TV Shows"
    >
      {results?.map((item) => (
        <AutocompleteItem
          key={item.id}
          textValue={"title" in item ? item.title : item.name}
        >
          <MediaAutocompleteCard media={item} />
        </AutocompleteItem>
      )) ?? null}
    </Autocomplete>
  );
};

const MediaAutocompleteCard = ({
  media,
}: {
  media: SearchMovieResult | SearchTVResult;
}) => {
  let name;
  let date;
  if ("title" in media) {
    name = media.title;
    date = media.release_date;
  } else {
    name = media.name;
    date = media.first_air_date;
  }

  devLog.log("Media:", media);

  return (
    <article className="flex gap-2 font-main">
      <div className="aspect-2/3 w-[50px] flex-shrink-0">
        <Image src={getImageUrl(media.poster_path, "500")} radius="sm" />
      </div>

      <div className="flex flex-col ">
        <p className=" line-clamp-2">{name}</p>
        <p className="text-sm text-foreground/50">{formatDate(date, true)}</p>
      </div>
    </article>
  );
};
export default SearchMediaField;
