import { useSearch } from "@/hooks/useSearch";
import { getImageUrl } from "@/lib/api/tmdb";
import { cn, devLog, formatDate } from "@/lib/utils";
import { SearchMovieResult, SearchTVResult } from "@/types/tmdb";
import { MediaType } from "@/types/trending";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Image } from "@heroui/image";
import React, { Dispatch, useEffect, useState } from "react";

const FilterAutocomplete = ({
  className,
  mediaType,
  setMediaId,
  setBackdropPath,
}: {
  className?: string;
  mediaType: MediaType;
  setMediaId: Dispatch<React.SetStateAction<string | number | null>>;
  setBackdropPath: Dispatch<React.SetStateAction<string | null>>;
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
      isRequired
      className={cn(className)}
      name="title"
      placeholder="Type to search..."
      isLoading={isFetching}
      onInputChange={setSearchValue}
      aria-label="Search Movies or TV Shows"
      onSelectionChange={(key) => {
        setMediaId(key as string | number);

        const selectedMedia = results?.find((item) => item.id == key);
        selectedMedia && setBackdropPath(selectedMedia.backdrop_path);
      }}
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

export default FilterAutocomplete;
