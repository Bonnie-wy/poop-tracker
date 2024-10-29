"use server";

import { createSessionClient } from "@/lib/config/appwrite";
import { cookies } from "next/headers";

const checkAuth = async () => {
  const sessionCookie = await cookies();
  const appwriteSession = sessionCookie.get("appwrite-session");

  if (!appwriteSession) {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const { account } = await createSessionClient(appwriteSession.value);
    const user = await account.get();

    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
      },
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      isAuthenticated: false,
    };
  }
};

export default checkAuth;
