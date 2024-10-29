"use client";

import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";

const greetings = [
  "pooped",
  "done a no.2",
  "layed some bricks",
  "laid some pipes",
  "dropped some excess baggages",
];

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

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <h1>Have you {greetings[currentGreetingIndex]} today... </h1>
      <button
        onClick={handleClick}
        className="font-large rounded-full px-5 py-2.5 me-2 mb-2"
      >
        💩
      </button>
    </div>
  );
};

export default Home;
