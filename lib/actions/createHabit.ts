"use server";

import { createAdminClient } from "../config/appwrite";
import { ID } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

const createHabit = async (name: string) => {
  if (!name) {
    return {
      error: "Please fill in the name",
    };
  }

  // Get db
  const { databases } = await createAdminClient();

  try {
    // check user
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must log in to create a habit",
      };
    }

    // create a habit in db
    const newHabit = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_HABITS!,
      ID.unique(),
      {
        user_id: user.id,
        name,
        created_at: new Date(),
      }
    );

    revalidatePath("/home", "layout");

    return { success: true, data: newHabit };
  } catch (error) {
    console.log("error", error);
    return {
      error: "Could not create habit",
    };
  }
};

export default createHabit;
