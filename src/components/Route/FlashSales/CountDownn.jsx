import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../../server";
const CountDownn = ({ data }) => {
  const { flashSale } = data;
  const { endDate, _id } = flashSale;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      if (updatedTimeLeft === null) {
        // Time's up, perform your action (e.g., delete)
        axios.delete(`${server}/flashsale/flash-sales/${_id}`);
        clearInterval(timer);
      } else {
        setTimeLeft(updatedTimeLeft);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);
  function calculateTimeLeft() {
    const now = new Date();
    const endDateValue = new Date(endDate);
    if (endDateValue > now) {
      const endDateWithTimeZone = new Date(endDateValue + " UTC");
      const difference = endDateWithTimeZone - now;
      return {
        d: (
          <div className="w-10 mx-0 lg:mx-1 p-2 bg-gray-200 text-yellow-500 rounded-lg">
            <div className="font-mono leading-none" x-text="days">
              {Math.floor(difference / (1000 * 60 * 60 * 24))}
            </div>
            <div className="font-mono uppercase text-sm leading-none">Dys</div>
          </div>
        ),
        h: (
          <div className="w-10 mx-1 lg:mx-1 p-2 bg-gray-200 text-yellow-500 rounded-lg">
            <div className="font-mono leading-none" x-text="days">
              {Math.floor((difference / (1000 * 60 * 60)) % 24)}
            </div>
            <div className="font-mono uppercase text-sm leading-none">Hrs</div>
          </div>
        ),
        m: (
          <div className="w-10 mx-1 lg:mx-1 p-2 bg-gray-200 text-yellow-500 rounded-lg">
            <div className="font-mono leading-none" x-text="days">
              {Math.floor((difference / (1000 * 60)) % 60)}
            </div>
            <div className="font-mono uppercase text-sm leading-none">Min</div>
          </div>
        ),
        s: (
          <div className="w-10 mx-0 lg:mx-1 p-2 bg-gray-200 text-yellow-500 rounded-lg">
            <div className="font-mono leading-none" x-text="days">
              {Math.floor((difference / 1000) % 60)}
            </div>
            <div className="font-mono uppercase text-sm leading-none">Sec</div>
          </div>
        ),
      }; // IS YOUR NET  OK?// YES
    } else {
      return null;
    }
  }
  const isOneHourLeft = timeLeft && timeLeft.h === 1;
  return (
    <div
      className={`countdown-container flex ${
        isOneHourLeft ? "red-countdown" : ""
      }`}
    >
      {timeLeft === null ? (
        <span className="text-[red] text-[15px] lg:text-[25px] ">
          Time's Up
        </span>
      ) : (
        Object.keys(timeLeft).map((interval) => (
          <span
            key={interval}
            className={`${isOneHourLeft ? "text-[red]" : "text-[#475ad2]"}`}
          >
            {timeLeft[interval]}
          </span>
        ))
      )}
    </div>
  );
};
export default CountDownn;
