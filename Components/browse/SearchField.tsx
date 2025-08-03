"use client";
import { useDebounce } from "@/hooks/useDebounce";
import useIsMobile from "@/hooks/useIsMobile";
import { Input } from "@heroui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";

const SearchField = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const initial = searchParams.get("query") || "";
  const [value, setValue] = useState(initial);
  const debounced = useDebounce(value, 400);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debounced) {
      params.set("query", debounced);
    } else {
      params.delete("query");
    }

    router.replace(`?${params.toString()}`);
  }, [debounced, router]);

  return (
    <Input
      name="search"
      value={value}
      onValueChange={setValue}
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
  );
};

export default SearchField;
