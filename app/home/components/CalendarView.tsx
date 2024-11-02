import { Suspense } from "react";
import { addDays, formatISO, getDaysInYear, startOfYear } from "date-fns";
import CalendarButton from "./CalendarButton";
import Activities from "./Activities";

const datesOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function dayOfYearToISODate(
  dayOfYear: number,
  year = new Date().getFullYear()
) {
  const startDate = startOfYear(new Date(year, 0));
  const targetDate = addDays(startDate, dayOfYear - 1);
  return formatISO(targetDate, { representation: "date" });
}

const CalendarView = ({ records }: { records: number[] }) => {
  const today = new Date();
  const daysInYear = getDaysInYear(today);
  const startYear = startOfYear(today);

  const daysOfYear = Array.from({ length: daysInYear }, (_, i) => {
    const day = i + 1;
    return { day: i + 1, date: dayOfYearToISODate(day) };
  });
  const firstDayOfYear = startYear.getDate();
  const fillerCells = Array.from({ length: firstDayOfYear - 1 }, (_, i) => ({
    day: 0,
    date: "",
  }));

  return (
    <div>
      <div className="flex gap-2">
        <div className="grid grid-rows-7 grid-flow-col gap-1">
          {datesOfWeek.map((date) => (
            <p key={date} className="w-[12px] h-[12px] text-xs">
              {date.slice(0, 1)}
            </p>
          ))}
        </div>
        <div className="grid grid-rows-7 grid-flow-col gap-1 h-fit">
          {[...fillerCells, ...daysOfYear].map(({ day, date }) => {
            const hasRecord = records.includes(day);
            return (
              <CalendarButton key={date} date={date} hasRecord={hasRecord} />
            );
          })}
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Activities />
      </Suspense>
    </div>
  );
};

export default CalendarView;
