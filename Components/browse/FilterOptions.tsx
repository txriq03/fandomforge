"use client";
import { Select, SelectItem } from "@heroui/select";
import { useGenres } from "@/hooks/useGenres";
import { Genre } from "@/types/genres";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MediaType } from "@/types/trending";

const FilterOptions = () => {
  const router = useRouter();
  const params = useParams();
  const mediaType = params.browseType as MediaType;

  const { data, isPending } = useGenres(mediaType);
  const genresList: Genre[] = data?.genres;
  const [genres, setGenres] = useState<Set<string>>();
  const [selectedYear, setSelectedYear] = useState<string>("");

  const years = Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => {
      const year = 1970 + i;
      return { key: year.toString(), label: year.toString() };
    }
  ).reverse();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (genres && genres?.size > 0) {
      params.set("genres", Array.from(genres).join(","));
    } else {
      params.delete("genres");
    }

    if (selectedYear) {
      params.set("year", selectedYear);
    } else {
      params.delete("year");
    }

    router.replace(`?${params.toString()}`);
  }, [genres, selectedYear, router]);

  const handleGenreChange = (e: any) => {
    const values = e.target.value
      .split(",")
      .filter((v: string) => v.trim() !== "");
    setGenres(new Set(values));
  };

  const handleYearChange = (value: string | null) => {
    setSelectedYear(value || "");
  };

  return (
    <>
      {/* Genres */}
      <Select
        name="genre"
        className="max-w-[230px]"
        classNames={{
          base: "hidden sm:flex",
          label: "group-data-[has-label-outside=true]:text-indigo-200",
          trigger:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
          popoverContent: "bg-[#202339]",
        }}
        label="Genres"
        isVirtualized
        labelPlacement="outside"
        placeholder="Any"
        selectionMode="multiple"
        isLoading={isPending}
        isClearable
        spinnerProps={{ variant: "simple" }}
        onChange={handleGenreChange}
      >
        {genresList?.map((genre: Genre) => (
          <SelectItem
            key={genre.id}
            classNames={{
              base: "data-[hover=true]:bg-primary/15 data-[hover=true]:text-primary-light font-main data-[selectable=true]:focus:bg-primary/15 data-[selectable=true]:focus:text-primary-light",
            }}
          >
            {genre.name}
          </SelectItem>
        ))}
      </Select>

      {/* Year */}
      <Autocomplete
        className="max-w-[230px]"
        name="year"
        label="Year"
        labelPlacement="outside"
        placeholder="Any"
        isClearable
        defaultItems={years}
        onValueChange={handleYearChange}
        classNames={{
          base: "hidden sm:flex font-main",
          popoverContent: "bg-[#202339]",
        }}
        inputProps={{
          classNames: {
            label:
              " group-data-[filled-within=true]:text-indigo-200 text-indigo-200",
            inputWrapper:
              "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
          },
        }}
      >
        {(item) => (
          <AutocompleteItem
            key={item.key}
            classNames={{
              base: "data-[hover=true]:bg-primary/15 data-[hover=true]:text-primary-light data-[selectable=true]:focus:bg-primary/15 data-[selectable=true]:focus:text-primary-light",
            }}
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};

export default FilterOptions;
