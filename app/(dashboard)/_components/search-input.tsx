"use client";

import { ChangeEvent, useEffect, useState } from "react";
import queryString from "query-string";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "usehooks-ts";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const query = queryString.stringifyUrl(
      { url: "/", query: { search: debouncedSearch } },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(query);
  }, [debouncedSearch, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
