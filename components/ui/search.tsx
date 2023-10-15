"use client";

import { ICONSIZE } from "@/shared/size";
import Icon from "../ui/icon";

import { SearchIcon } from "lucide-react";
import { Input } from "./input";

const Search: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-4 bg-gray-100 px-6 py-[1px] rounded-full">
      <Input
        type="text"
        placeholder="Search..."
        className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
      />
      <Icon icon={SearchIcon} size={ICONSIZE.sm} />
    </div>
  );
};

export default Search;
