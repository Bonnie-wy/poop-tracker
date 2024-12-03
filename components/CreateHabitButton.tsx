"use client";

import { useRouter } from "next/navigation";

const CreateHabitButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create-habit");
  };

  return <button onClick={handleClick}>Create Habit</button>;
};

export default CreateHabitButton;
