import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const JobFilters = () => {
  return (
    <div className="bg-white rounded border px-4 py-6">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Filter</p>
        <p className="font-semibold text-blue-600 text-xs cursor-pointer">
          Clear all
        </p>
      </div>
      {/* Filter */}
      <div className="pt-6">
        <p className="font-bold">Salary</p>
        <div className="pt-3">
          <Slider />
        </div>
      </div>
      <div className="pt-6">
        <p className="font-bold">Proposals</p>
        <div className="flex gap-2 items-center pt-4">
          <Checkbox id="lessthan10" />
          <label htmlFor="lessthan10" className="text-sm text-gray-500">
            Less than 10
          </label>
        </div>
        <div className="flex gap-2 items-center pt-4">
          <Checkbox id="10to50" />
          <label htmlFor="10to50" className="text-sm text-gray-500">
            10 to 50
          </label>
        </div>
        <div className="flex gap-2 items-center pt-4">
          <Checkbox id="50to100" />
          <label htmlFor="50to100" className="text-sm text-gray-500">
            50 to 100
          </label>
        </div>
        <div className="flex gap-2 items-center pt-4">
          <Checkbox id="morethan100" />
          <label htmlFor="morethan100" className="text-sm text-gray-500">
            More than 100
          </label>
        </div>
      </div>
      <div className="pt-6">
        <p className="font-bold">Experience level</p>
        <div className="flex gap-2 items-center pt-4">
          <Checkbox id="entry" />
          <label htmlFor="entry" className="text-sm text-gray-500">
            Entry level
          </label>
        </div>
        <div className="flex gap-2 items-center pt-4">
          <Checkbox id="intermediate" />
          <label htmlFor="intermediate" className="text-sm text-gray-500">
            Intermediate
          </label>
        </div>
        <div className="flex gap-2 items-center pt-4">
          <Checkbox id="expert" />
          <label htmlFor="expert" className="text-sm text-gray-500">
            Expert
          </label>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
