import AddPoopRecordButton from "./components/AddRecordbutton";
import getPoopHistory from "@/lib/actions/getPoopHistory";
import { intlFormat } from "date-fns";
import { Models } from "node-appwrite";

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

  return (
    <>
      <AddPoopRecordButton />
      <h3>💩 Poop history</h3>
      {filteredDates ? (
        dates.map((date) => (
          <p>
            {date}: {filteredDates[date].length}
          </p>
        ))
      ) : (
        <p>There's no record</p>
      )}
    </>
  );
};

export default Home;
