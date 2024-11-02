"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Models, Query } from "node-appwrite";
import checkAuth from "./checkAuth";
import { createSessionClient } from "@/lib/config/appwrite";
import { endOfDay, startOfDay } from "date-fns";

interface PoopRecord extends Models.Document {
  user_id: string;
  created_at: string;
}

const getPoopHistoryByDate = async (date: string) => {
  // 1. Check authentication
  const sessionCookies = await cookies();
  const appwriteCookies = sessionCookies.get("appwrite-session");

  if (!appwriteCookies) {
    redirect("/login");
  }

  try {
    // 2. Create date range for the given date
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
      return {
        error: "Invalid date format",
      };
    }

    const dayStart = startOfDay(inputDate);
    const dayEnd = endOfDay(inputDate);

    // 3. Check user authentication
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to see history",
      };
    }

    // 4. Initialize Appwrite client
    const { databases } = await createSessionClient(appwriteCookies.value);

    if (!dayStart || !dayEnd) {
      return {
        error: "Date is invalid",
      };
    }

    // 5. Query the database
    const { documents: records } = await databases.listDocuments<PoopRecord>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RECORD!,
      [
        Query.equal("user_id", user.id),
        Query.limit(1000),
        Query.between(
          "created_at",
          dayStart.toISOString(),
          dayEnd.toISOString()
        ),
        Query.orderAsc("created_at"),
      ]
    );

    return {
      success: true,
      data: records,
    };
  } catch (error) {
    console.error("Error fetching history:", error);
    return {
      error: error instanceof Error ? error.message : "Could not get history",
    };
  }
};

export default getPoopHistoryByDate;
