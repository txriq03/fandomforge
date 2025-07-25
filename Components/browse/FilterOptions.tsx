"use client";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import React from "react";
import { TbSearch } from "react-icons/tb";
import { Select, SelectItem } from "@heroui/select";
import useIsMobile from "@/hooks/useIsMobile";
import { useMovieGenres } from "@/hooks/useMovieGenres";
import { Genre } from "@/types/genres";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

const FilterOptions = () => {
  const { data, isPending } = useMovieGenres();

  const genres: Genre[] = data?.genres;
  const isMobile = useIsMobile();

  const years = Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => {
      const year = 1970 + i;
      return { key: year.toString(), label: year.toString() };
    }
  ).reverse();

  return (
    <Form className="flex flex-row gap-4">
      {/* Search */}
      <Input
        name="search"
        classNames={{
          label: "group-data-[filled-within=true]:text-indigo-200",
          inputWrapper:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7 group-data-[has-value=true]:placeholder:text-primary-light/5",
        }}
        className="group-data-[has-value=true]:placeholder:text-primary-light/5 sm:max-w-[230px]"
        label={isMobile ? "" : "Search"}
        placeholder={isMobile ? "Search" : ""}
        startContent={<TbSearch className="text-indigo-200" />}
        labelPlacement={isMobile ? "inside" : "outside"}
        isClearable
      />

      {/* Genres */}
      <Select
        name="genre"
        className="max-w-[230px]"
        classNames={{
          base: "hidden sm:flex",
          label: "group-data-[has-label-outside=true]:text-indigo-200",
          trigger:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
          popoverContent: "bg-black/20",
        }}
        label="Genres"
        isVirtualized
        labelPlacement="outside"
        placeholder="Any"
        selectionMode="multiple"
        isLoading={isPending}
        isClearable
        spinnerProps={{ variant: "simple" }}
      >
        {genres?.map((genre: Genre) => (
          <SelectItem
            key={genre.id}
            classNames={{
              base: "data-[hover=true]:bg-primary/5 data-[focus=true]:bg-primary/5 ",
              wrapper:
                "data-[hover=true]:bg-primary/5 data-[focus=true]:bg-primary/5 ",
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
        classNames={{
          base: "hidden sm:flex",
          popoverContent: "bg-black/20",
        }}
        inputProps={{
          classNames: {
            label:
              "dark:group-data-[has-label-outside=true]:text-indigo-200 text-indigo-200",
            inputWrapper:
              "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
          },
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
    </Form>
  );
};

export default FilterOptions;
