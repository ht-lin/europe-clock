import { Fragment } from "react";
import moment from "moment-timezone";
import { CityProps } from "../types/cityProps";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type Props = {
  setChosedCity: (value: CityProps[]) => void;
  setIsChoseCity: (value: boolean) => void;
};

const ChoseCity = function ({ setChosedCity, setIsChoseCity }: Props) {
  const cities: CityProps[] = moment.tz
    .names()
    .filter((city) => city.includes("Europe"))
    .map((city) => ({
      name: city.split("/")[1],
      time: moment.tz(city),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  type FormData = {
    chosedCities: number[];
  };

  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      chosedCities: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setChosedCity(data.chosedCities.map((i) => cities[i]));
    setIsChoseCity(false);
  };

  return (
    <div
      className="h-full overflow-y-auto flex flex-col"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        onClick={handleSubmit(onSubmit)}
        className="sticky top-0 text-white bg-blue-500 w-full rounded-lg"
      >
        Confirm
      </button>
      {cities.map((city, i, cities) => (
        <Fragment key={city.name}>
          {i === 0 || city.name.charAt(0) !== cities[i - 1].name.charAt(0) ? (
            <>
              <p className="uppercase text-gray-400 text-lg my-1">
                {city.name.charAt(0)}
              </p>
              <div className="flex items-center justify-between px-2">
                <label className="text-lg">
                  <input
                    {...register("chosedCities")}
                    type="checkbox"
                    value={i}
                  />{" "}
                  {city.name}
                </label>
                <div className="text-lg">{city.time.format("HH:mm")}</div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between px-2">
              <label className="text-lg">
                <input
                  {...register("chosedCities")}
                  type="checkbox"
                  value={i}
                />{" "}
                {city.name}
              </label>
              <div className="text-lg">{city.time.format("HH:mm")}</div>
            </div>
          )}
        </Fragment>
      ))}
      <DevTool control={control} />
    </div>
  );
};

export default ChoseCity;
