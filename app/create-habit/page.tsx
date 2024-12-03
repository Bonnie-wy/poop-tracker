"use client";

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
    <div>
      <h1>Create a new habit</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </form>
    </div>
  );
};

export default Page;
