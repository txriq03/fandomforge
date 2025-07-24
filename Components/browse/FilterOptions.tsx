"use client";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import React from "react";
import { TbSearch } from "react-icons/tb";
import { Select, SelectItem } from "@heroui/select";
import useIsMobile from "@/hooks/useIsMobile";
import { useMovieGenres } from "@/hooks/useMovieGenres";
import { Genre } from "@/types/genres";

const FilterOptions = () => {
  const { data, isPending } = useMovieGenres();

  const genres: Genre[] = data?.genres;
  const isMobile = useIsMobile();
  return (
    <Form className="flex flex-row gap-4">
      <Input
        name="search"
        classNames={{
          label: "group-data-[filled-within=true]:text-indigo-200",
          inputWrapper:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7 group-data-[has-value=true]:placeholder:text-primary-light/5",
        }}
        className="group-data-[has-value=true]:placeholder:text-primary-light/5"
        label={isMobile ? "" : "Search"}
        placeholder={isMobile ? "Search" : ""}
        radius="sm"
        startContent={<TbSearch className="text-indigo-200" />}
        labelPlacement={isMobile ? "inside" : "outside"}
        isClearable
      />
      <Select
        name="genre"
        classNames={{
          base: "hidden lg:flex",
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
      <Select
        classNames={{
          label: "group-data-[has-label-outside=true]:text-indigo-200",
          base: "hidden lg:flex",
          trigger:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
        }}
        label="Year"
        radius="sm"
        labelPlacement="outside"
        placeholder="Any"
      >
        <SelectItem>Test</SelectItem>
      </Select>
      <Select
        classNames={{
          label: "group-data-[has-label-outside=true]:text-indigo-200",
          base: "hidden lg:flex",
          trigger:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
        }}
        label="Type"
        radius="sm"
        labelPlacement="outside"
        placeholder="Any"
      >
        <SelectItem>Test</SelectItem>
      </Select>
      <Select
        classNames={{
          label: "group-data-[has-label-outside=true]:text-indigo-200",
          base: "hidden lg:flex",
          trigger:
            "bg-primary-light/5 data-[hover=true]:bg-primary-light/10 data-[focus=true]:bg-primary-light/7",
        }}
        label="Type"
        radius="sm"
        labelPlacement="outside"
        placeholder="Any"
      >
        <SelectItem>Test</SelectItem>
      </Select>
    </Form>
  );
};

export default FilterOptions;
