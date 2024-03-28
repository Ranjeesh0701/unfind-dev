import { ProjectStatusMap } from "@/config/mapEnums";
import { Badge } from "@/components/ui/badge";

interface StatusBarProps {
  status: "OPEN" | "CLOSED" | "INPROGRESS";
}

const StatusBar: React.FC<StatusBarProps> = ({ status }) => {
  return (
    <Badge className="py-1 px-3" variant="secondary">
      {ProjectStatusMap[status]}
    </Badge>
  );
};

export default StatusBar;
