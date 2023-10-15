"use client";

import { ICONSIZE } from "@/shared/size";
import Icon from "../ui/icon";

import { SearchIcon } from "lucide-react";
import { Input } from "./input";

const Search: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-4 bg-gray-100 px-6 py-2 rounded-full">
      <Input type="text" placeholder="Search..." />
      <Icon icon={SearchIcon} size={ICONSIZE.sm} />
    </div>
  );
};

export default Search;
