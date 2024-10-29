"use client";

import { useEffect, useState } from "react";
import recordPoop from "@/lib/actions/recordPoop";

const AddPoopRecordButton = () => {
  const [status, setStatus] = useState<string>("");

  const handleClick = async () => {
    const result = await recordPoop(new Date());

    if (result.error) {
      setStatus("error");
    }

    if (result.success) {
      setStatus("success");
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded-full text-6xl shadow"
      >
        💩🚽
      </button>
      {status === "error" && (
        <p className="text-red-600">Something went wrong...</p>
      )}
      {status === "success" && (
        <p className="text-green-600">Successfully recorded!</p>
      )}
    </>
  );
};

export default AddPoopRecordButton;
