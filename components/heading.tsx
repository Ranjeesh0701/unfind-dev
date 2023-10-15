"use client";

interface HeadingProps {
  title: string;
  size?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, size, center }) => {
  return <div className={`${center && "text-center"} text-2xl`}>{title}</div>;
};

export default Heading;
