"use client";

import { useEffect, useState } from "react";
import recordPoop from "@/lib/actions/recordPoop";

// import { Button } from "@/components/ui/button";

const greetings = ["done a no.2", "dropped some excess baggages", "pooped"];

const Home = () => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState<number>(0);
  const [error, setError] = useState(false);

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

  const handleClick = async () => {
    const result = await recordPoop(new Date());
    if (result.error) {
      setError(true);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-2xl">
          Have you {greetings[currentGreetingIndex]} today...{" "}
        </h1>
        <button
          onClick={handleClick}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded-full text-6xl shadow"
        >
          💩🚽
        </button>
      </main>
    </div>
  );
};

export default Home;
