"use client";

import { useSearchParams } from "next/navigation";

const Activities = () => {
  const searchParams = useSearchParams();

  const date = searchParams.get("date");

  console.log(date);

  return <div>Activities: {date}</div>;
};

export default Activities;
