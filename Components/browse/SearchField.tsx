"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { useSearchContext } from "@/providers/SearchProvider";
import { Input } from "@heroui/input";
import { TbSearch } from "react-icons/tb";

const SearchField = ({ formRef }: { formRef: React.RefObject<null> }) => {
  const isMobile = useIsMobile();
  const { query, setQuery } = useSearchContext();

  return (
    <Input
      name="search"
      value={query}
      onValueChange={setQuery}
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
