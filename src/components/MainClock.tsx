import { CityProps } from "../types/cityProps";

const MainClock = function ({ name, time }: CityProps) {
  const [hour, minute, second] = time.format("HH mm ss").split(" ");

  const clockMarks: number[] = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-sm font-thin text-gray-500">{`${
        name.split("/")[1]
      }, ${time.format("HH:mm, ddd, DD/MM")}`}</p>
      <div className="w-48 aspect-square rounded-full border-2 border-gray-400 relative">
        {/* Draw the clock */}
        <ul className="absolute h-1/2 left-1/2 bottom-1/2 -translate-x-1/2">
          {clockMarks.map((deg, i) => (
            <li
              key={deg}
              className={`absolute h-full origin-bottom-left`}
              style={{ transform: `rotate(${deg}deg) translateX(-50%)` }}
            >
              <div
                className={`absolute ${
                  deg % 2 === 0 ? "h-3" : "h-1"
                } w-px  -translate-x-1/2 top-1 bg-gray-400`}
              ></div>
              <div
                className={`absolute -left-[0px] text-xs ${
                  i % 6 === 0 ? "font-bold" : "font-thin"
                } top-4 origin-left`}
                style={{ transform: `rotate(-${deg}deg) translateX(-50%)` }}
              >
                {i % 2 === 0 ? i : ""}
              </div>
            </li>
          ))}
        </ul>

        {/* The dots and Hands of hour, minute and second */}
        <div
          className="absolute h-1/2 w-px left-1/2 bottom-[40%] bg-gray-400 rounded-md"
          style={{
            transformOrigin: "left 80%",
            transform: `rotate(${
              parseInt(second, 10) * 6
            }deg) translateX(-50%)`,
          }}
        ></div>
        <div
          className="absolute h-1/3  w-1 left-1/2 bottom-1/2 bg-gray-400 rounded-md origin-bottom-left"
          style={{
            transform: `rotate(${
              parseInt(minute, 10) * 6
            }deg) translateX(-50%)`,
          }}
        ></div>
        <div
          className="absolute h-1/5 w-1 left-1/2 bottom-1/2  bg-blue-500 rounded-md origin-bottom-left"
          style={{
            transform: `rotate(${
              parseInt(hour, 10) * 15 + Math.floor(parseInt(minute, 10) * 0.25)
            }deg) translateX(-50%)`,
          }}
        ></div>
        <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 h-2 aspect-square rounded-full bg-blue-500"></div>
        <div
          className="absolute h-1/2 left-1/2 bottom-1/2 origin-bottom-left"
          style={{
            transform: `rotate(${
              parseInt(hour, 10) * 15 + Math.floor(parseInt(minute, 10) * 0.25)
            }deg) translateX(-50%)`,
          }}
        >
          <div className="absolute h-2 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default MainClock;
