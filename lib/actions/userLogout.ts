"use server";

import { createSessionClient } from "../config/appwrite";
import { cookies } from "next/headers";

async function userLogout() {
  // Retrieve the session cookie
  const sessionCookies = await cookies();
  const appwriteSession = sessionCookies.get("appwrite-session");

  if (!appwriteSession) {
    return {
      error: "No session cookie found",
    };
  }
  try {
    const { account } = await createSessionClient(appwriteSession.value);

    // Delete current session
    await account.deleteSession("current");

    // Clear session cookie
    sessionCookies.delete("appwrite-session");

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error deleting session",
    };
  }
}

export default userLogout;
