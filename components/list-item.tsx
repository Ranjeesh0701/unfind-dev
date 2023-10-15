"use client";

import { IconType } from "react-icons";

interface ListItemProps {
  label: string;
  icon?: IconType;
  onClick?: () => void;
  type?: string;
  spacing?: string;
  active?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  label,
  icon: Icon,
  onClick,
  type,
  spacing,
  active,
}) => {
  return (
    <div
      className={`relative flex items-center gap-2 cursor-pointer hover:bg-gray-50 ${
        active && "bg-gray-50"
      } ${spacing ? "px-4 py-4" : "px-3 py-2"} rounded ${
        type === "button" && "font-bold"
      }`}
      onClick={onClick}
    >
      {active && (
        <div className="absolute h-full w-1 bg-gray-700 left-0 rounded-full"></div>
      )}
      {Icon && (
        <div>
          <Icon />
        </div>
      )}
      <div>
        <p className={`text-sm`}>{label}</p>
      </div>
    </div>
  );
};

export default ListItem;
