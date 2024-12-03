import AddPoopRecordButton from "./components/AddRecordbutton";
import getPoopHistory from "@/lib/actions/getPoopHistory";
import { getDayOfYear, intlFormat } from "date-fns";
import { Models } from "node-appwrite";
import CalendarView from "./components/CalendarView";
import CreateHabitButton from "@/components/CreateHabitButton";

const formattedDate = (date: string) => {
  return intlFormat(date, {
    locale: "en-GB",
  });
};

const Home = async () => {
  const { data } = await getPoopHistory();

  const filteredDates = data?.reduce((acc, cur) => {
    const createdDate = formattedDate(cur.$createdAt);
    return {
      ...acc,
      [createdDate]: [...(acc[createdDate] ?? []), cur],
    };
  }, {} as Record<string, Models.Document[]>);

  const dates = Object.keys(filteredDates || {});

  const splitDate = (date: string) => {
    const splitDate = date.split("/");
    const day = splitDate[0];
    const month = splitDate[1];
    const year = splitDate[2];

    return { day, month, year };
  };

  const records = dates.map((date) => {
    const split = splitDate(date);

    const year = +split.year;
    const monthIndex = +split.month - 1;
    const day = +split.day;

    return getDayOfYear(new Date(year, monthIndex, day));
  });

  return (
    <>
      <CreateHabitButton />
      <AddPoopRecordButton />
      <h3>💩 Poop history</h3>
      <CalendarView records={records} />
    </>
  );
};

export default Home;
