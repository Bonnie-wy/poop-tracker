"use server";

import { createAdminClient } from "@/lib/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

const recordPoop = async (date: Date) => {
  // Get db
  const { databases } = await createAdminClient();

  try {
    // check user
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must log in to make a record",
      };
    }

    // create a poop record
    const newRecord = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RECORD!,
      ID.unique(),
      {
        user_id: user.id,
        created_at: date,
      }
    );

    revalidatePath("/home", "layout");

    return {
      success: true,
      data: newRecord,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      error: "Could not add a poop record",
    };
  }
};

export default recordPoop;
