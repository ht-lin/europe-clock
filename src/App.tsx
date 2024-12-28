import { useState, useEffect } from "react";
import MainClock from "./components/MainClock";
import CityTimeZone from "./components/CityTimeZone";
import ChoseCity from "./components/ChoseCity";
import moment, { Moment } from "moment-timezone";
import { CityProps } from "./types/cityProps";

moment.tz.setDefault();

function App() {
  const [now, setNow] = useState<Moment>(moment());
  const [chosedCity, setChosedCity] = useState<CityProps[]>([]);
  const [isChoseCity, setIsChoseCity] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mainCity: CityProps = {
    name: moment.tz.guess(true),
    time: now,
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {isChoseCity ? (
        <div className="h-4/6 w-56 rounded-md bg-gray-100">
          <ChoseCity
            setChosedCity={setChosedCity}
            setIsChoseCity={setIsChoseCity}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start gap-1 h-4/6 w-56 rounded-md bg-gray-300 py-2 relative">
          <h1 className="text-2xl uppercase">Europe clock</h1>
          <MainClock {...mainCity} />
          <div
            className="overflow-y-auto w-full"
            style={{ scrollbarWidth: "none" }}
          >
            {chosedCity.map((city) => (
              <CityTimeZone key={city.name} {...city} />
            ))}
          </div>
          <button
            className="absolute left-1/2 bottom-2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-10 aspect-square rounded-full bg-blue-500 text-white text-3xl"
            onClick={() => setIsChoseCity(true)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
