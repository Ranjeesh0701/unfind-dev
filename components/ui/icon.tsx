"use client";

import { LucideIcon } from "lucide-react";

import { ICONSIZE } from "@/shared/size";

interface IconProps {
  icon: LucideIcon;
  label?: string;
  labelVertical?: boolean;
  count?: number;
  size?: number;
  pointer?: boolean;
  action?: () => void;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  icon: Icon,
  label,
  size,
  pointer,
  labelVertical,
  color,
}) => {
  return (
    <div
      className={`flex items-center justify-center ${
        labelVertical ? "flex-col" : "gap-2"
      }`}
    >
      <Icon
        className={`${pointer && "cursor-pointer"}`}
        color={color ? color : "black"}
        size={size || ICONSIZE.md}
      />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
};

export default Icon;
