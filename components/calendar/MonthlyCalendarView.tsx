"use client";
import { removeLeadingZero } from "@/lib/util/removeLeadingZero";
import { calculateEndHour } from "@/lib/util/timeUtils";
import { getColorHexadecimal } from "@/util/types/colors.enum";
import { Event } from "@/util/types/event.types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FC, useState } from "react";

interface MonthlyCalendarViewProps {
  events: Event[];
  orgId: number;
}

const MonthlyCalendarView: FC<MonthlyCalendarViewProps> = ({
  events,
  orgId,
}) => {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  console.log(events);
  const weeks = [];
  let week = [];

  // Adjust the first day of the week to be Sunday
  let adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const lastMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  let nextMonthDays = 1;

  let dayCounter = 1;

  for (let i = 0; i < 5; i++) {
    // Only iterate for 5 weeks
    week = [];

    for (let j = 0; j < 7; j++) {
      const isToday =
        dayCounter === currentDate.getDate() &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear();

      if (i === 0 && j < adjustedFirstDay) {
        week.push(
          <td key={`empty-start-${j}`} className={`border p-4 `}>
            <div className="text-gray-400 items-start flex justify-center h-20">
              {lastMonthDays - adjustedFirstDay + j + 1}
            </div>
          </td>
        );
      } else if (dayCounter <= daysInMonth) {
        week.push(
          <td key={dayCounter} className={`border p-4`}>
            <div className={`flex items-start h-20 w-full`}>
              <div className="flex flex-col items-center w-full">
                <p
                  className={
                    isToday
                      ? "bg-custom-blue-100 text-white font-bold px-[7px] rounded-full -translate-y-1 "
                      : ""
                  }
                >
                  {dayCounter}
                </p>
                <div className="flex flex-col items-stretch h-16 truncate">
                  {events.map((event) => {
                    return event.dates.map((date) => {
                      //get day, month and year
                      const day = removeLeadingZero(date.date.split("-")[0]);
                      const month = removeLeadingZero(date.date.split("-")[1]);
                      const year = date.date.split("-")[2];
                      //compare it to current day
                      if (
                        day === dayCounter.toString() &&
                        month === (currentMonth + 1).toString() &&
                        year === currentYear.toString()
                      ) {
                        const startHour = event.startHour.slice(0, -3);
                        const endHour = calculateEndHour(
                          event.startHour,
                          event.duration
                        );
                        const color = getColorHexadecimal(event.color);
                        return (
                          <div
                            key={date.id}
                            className="flex flex-row items-center justify-start lg:space-x-2 space-x-1"
                          >
                            <div
                              className="w-[12px] h-[12px] rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <div className="flex flex-row items-center justify-start lg:space-x-2">
                              <p className="text-[9px] line-clamp-1 hidden xl:block truncate">
                                {startHour} - {endHour}
                              </p>
                              <p className="font-semibold text-[10px] truncate lg:w-20 w-12">
                                {event.name}
                              </p>
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    });
                  })}
                </div>
              </div>
            </div>
          </td>
        );
        dayCounter++;
      } else {
        week.push(
          <td key={`empty-end-${j}`} className={`border p-4 text-gray-400`}>
            <div className={`items-start flex justify-center h-20`}>
              {nextMonthDays}
            </div>
          </td>
        );
        nextMonthDays++;
      }
    }

    weeks.push(<tr key={i}>{week}</tr>);
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToCurrentMonth = () => {
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.getMonth());
  };

  return (
    <div className="">
      <div className="w-full flex justify-end items-center mb-5 space-x-5">
        <div className="font-bold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          onClick={goToCurrentMonth}
          className="px-4 py-2 bg-[#D9D9D9] hover:bg-blue-500 hover:text-white rounded font-semibold border-custom-gray-300 border"
        >
          HOY
        </button>
        <button
          onClick={goToPreviousMonth}
          className="rounded-full hover:bg-gray-300 h-10 w-10 flex justify-center items-center"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={goToNextMonth}
          className="rounded-full hover:bg-gray-300 h-10 w-10 flex justify-center items-center"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-1/7 text-center font-semibold border-2 border-t-0 border-b-black">
              Lun
            </th>
            <th className="w-1/7 text-center font-semibold border-2 border-t-0 border-b-black">
              Mar
            </th>
            <th className="w-1/7 text-center font-semibold border-2 border-t-0 border-b-black">
              Mié
            </th>
            <th className="w-1/7 text-center font-semibold border-2 border-t-0 border-b-black">
              Jue
            </th>
            <th className="w-1/7 text-center font-semibold border-2 border-t-0 border-b-black">
              Vie
            </th>
            <th className="w-1/7 text-center font-semibold border-2 border-t-0 border-b-black">
              Sáb
            </th>
            <th className="w-1/7 text-center font-semibold border-2 border-t-0 border-b-black">
              Dom
            </th>
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
};

export default MonthlyCalendarView;
