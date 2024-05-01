import { AiOutlineEnter } from "react-icons/ai";

import { Button } from "@/components/ui/button";

interface NewProjectContextProps {
  children?: React.ReactNode;
  title: string | React.JSX.Element;
  description?: string | React.JSX.Element;
  buttonLabel: string;
  action?: () => void;
  disabled?: boolean;
}

const NewProjectContext: React.FC<NewProjectContextProps> = ({
  children,
  title,
  description,
  buttonLabel,
  action,
  disabled,
}) => {
  return (
    <div>
      <h1 className="text-5xl leading-snug">{title}</h1>
      <p className="text-lg py-6 leading-relaxed">{description}</p>
      <div>{children}</div>
      <div>
        <Button size="lg" onClick={action} disabled={disabled}>
          {buttonLabel}
        </Button>
        <p className="flex gap-2 pt-2 items-center text-sm text-gray-500">
          Press
          <span className="flex border-2 rounded text-xs px-2 py-1">
            Enter <AiOutlineEnter className="ml-2" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default NewProjectContext;
