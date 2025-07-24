"use client";
import { BrowseType } from "@/types/browseType";
import { MediaType } from "@/types/trending";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Popover, PopoverTrigger } from "@heroui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { TbChevronDown } from "react-icons/tb";

const BrowsePopover = ({ browseType }: { browseType: BrowseType }) => {
  const router = useRouter();

  const displayType = () => {
    switch (browseType) {
      case "movie":
        return "Movies";
      case "tv":
        return "TV Shows";
      case "reviews":
        return "Reviews";
    }
  };
  return (
    <Dropdown
      radius="sm"
      classNames={{
        base: "border-none outline-none lg:w-[220px] ",
        content: "bg-primary/5 text-primary-light font-main",
      }}
    >
      <DropdownTrigger>
        <button
          className="text-primary-light/50 bg-primary-light/5 hover:bg-primary/10 transition-colors duration-300 px-2 py-1 rounded-lg flex gap-1 items-center cursor-pointer"
          color="primary"
        >
          {displayType()}
          <TbChevronDown className="text-primary-light/25" />
        </button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="movie"
          className="data-[hover=true]:bg-primary-light"
          as={Link}
          href="/browse/movie"
        >
          Movie
        </DropdownItem>
        <DropdownItem
          key="tv"
          className="data-[hover=true]:bg-primary-light"
          as={Link}
          href="/browse/tv"
        >
          TV Shows
        </DropdownItem>
        <DropdownItem
          key="reviews"
          as={Link}
          href="/browse/reviews"
          className="data-[hover=true]:bg-primary-light"
        >
          Reviews
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default BrowsePopover;
