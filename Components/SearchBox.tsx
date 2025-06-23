"use client";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
  return (
    <Input
      placeholder="Search..."
      startContent={<Search className="text-foreground/50" />}
      className="max-w-md"
    />
  );
};

export default SearchBox;
