"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CalendarButton = ({
  date,
  hasRecord = false,
}: {
  date: string;
  hasRecord?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleClick = () =>
    router.push(pathname + "?" + createQueryString("date", date));

  return (
    <button
      key={date}
      className={`border border-slate-700 rounded-lg h-3 w-3 ${
        hasRecord ? "bg-lime-500" : ""
      }`}
      onClick={handleClick}
    />
  );
};

export default CalendarButton;
