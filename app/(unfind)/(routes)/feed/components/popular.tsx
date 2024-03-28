"use client";

import Heading from "@/components/heading";
import Category from "./category";

const Popular: React.FC = () => {
  return (
    <div className="pt-4">
      <Heading title="Popular" />
      <div className="pt-4 flex flex-row gap-6 overflow-x-auto scroll-smooth snap-x touch-pan-x no-scrollbar">
        <Category label="Web Development" hot />
        <Category label="Ui/Ux Engineer" />
        <Category label="Flutter Developer" />
        <Category label="React Developer" />
        <Category label="Java Developer" />
        <Category label="Python Developer" />
      </div>
    </div>
  );
};

export default Popular;
