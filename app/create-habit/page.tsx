"use client";

import Habits from "@/components/Habits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import createHabit from "@/lib/actions/createHabit";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInput = {
  name: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { success, error } = await createHabit(data.name);
    if (success) {
      alert("Habit created successfully");
    }

    if (error) {
      alert("An error has occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:min-w-48 min-w-20">
      <h1 className="text-3xl font-semibold">Create a new habit</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <Input
            placeholder="Enter a name"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}

          <Button type="submit" variant="outline">
            Create habit
          </Button>
          <Habits />
        </div>
      </form>
    </div>
  );
};

export default Page;
