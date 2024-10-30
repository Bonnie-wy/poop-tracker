import { getDaysInYear, startOfYear } from "date-fns";

const datesOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarView = ({ records }: { records: number[] }) => {
  const today = new Date();
  const daysInYear = getDaysInYear(today);
  const startYear = startOfYear(today);

  const daysOfYear = Array.from({ length: daysInYear }, (_, i) => i + 1);
  const firstDayOfYear = startYear.getDate();
  const fillerCells = Array.from({ length: firstDayOfYear - 1 }, (_, i) => 0);

  return (
    <div className="flex gap-2">
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {datesOfWeek.map((date) => (
          <p>{date.slice(0, 1)}</p>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-1 h-fit">
        {[...fillerCells, ...daysOfYear].map((day, index) => {
          const hasRecord = records.includes(day);
          return (
            <div
              key={`${day}-${index}`}
              className={`border border-slate-700 rounded-lg h-3 w-3 ${
                hasRecord ? "bg-lime-500" : ""
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
