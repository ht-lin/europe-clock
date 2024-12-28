import { CityProps } from "../types/cityProps";

const CityTimeZone = function ({ name, time }: CityProps) {
  return (
    <div className="w-full flex flex-col px-3 my-1">
      <div className="flex items-center justify-between">
        <p className="text-black font-bold text-base">{name}</p>
        <p className="text-black font-bold text-base">{time.format("HH:mm")}</p>
      </div>
      <p className="self-end text-xs text-gray-500">
        {time.format("ddd, DD/MM")}
      </p>
    </div>
  );
};

export default CityTimeZone;
