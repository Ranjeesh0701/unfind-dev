"use client";

import Icon from "@/components/ui/icon";
import { ICONSIZE } from "@/shared/size";
import { BsFire } from "react-icons/bs";

interface CategoryProps {
  label: string;
  img?: string;
  color?: string;
  hot?: boolean;
  onClick?: () => void;
}

const Category: React.FC<CategoryProps> = ({
  label,
  img,
  color,
  hot,
  onClick,
}) => {
  return (
    <div className="inline-block snap-center">
      <div
        className="relative h-[140px] w-[110px] rounded-lg px-4 py-4 cursor-pointer bg-gradient-to-b from-gray-400 to-gray-900"
        onClick={onClick}
      >
        {hot && (
          <div className="absolute bg-pink-500 rounded px-2 py-1 left-2 top-2 flex gap-1 items-center justify-between">
            <Icon icon={BsFire} color="white" size={ICONSIZE.sm} />
            <div className="text-xs font-semibold text-white">Hot</div>
          </div>
        )}
        <div className="flex items-end justify-end h-full w-full">
          <div className="text-xs text-white">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
