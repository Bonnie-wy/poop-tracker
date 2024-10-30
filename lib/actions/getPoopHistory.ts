"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";
import { createSessionClient } from "@/lib/config/appwrite";

const getPoopHistory = async () => {
  const sessionCookies = await cookies();
  const apprightCookies = sessionCookies.get("appwrite-session");
  if (!apprightCookies) {
    redirect("/login");
  }

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must be logged in to see history",
      };
    }

    const { databases } = await createSessionClient(apprightCookies.value);

    const { documents: records } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RECORD!,
      [Query.equal("user_id", user.id), Query.limit(1000)]
    );

    return {
      success: true,
      data: records,
    };
  } catch (error) {
    return {
      error: "Could not get hisotry",
    };
  }
};

export default getPoopHistory;
