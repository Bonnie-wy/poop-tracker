"use client";

import { useEffect, useState } from "react";
import AddPoopRecordButton from "./components/AddRecordbutton";

const greetings = ["done a no.2", "dropped some excess baggages", "pooped"];

const Home = () => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentGreetingIndex === greetings.length - 1) {
        setCurrentGreetingIndex(0);
        return;
      }

      setCurrentGreetingIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentGreetingIndex]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-2 row-start-2 items-center">
        <h1 className="text-2xl">
          Have you {greetings[currentGreetingIndex]} today...{" "}
        </h1>
        <AddPoopRecordButton />
      </main>
    </div>
  );
};

export default Home;
