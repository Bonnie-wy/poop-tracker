"use server";

import { cookies } from "next/headers";
import { createAdminClient } from "../config/appwrite";

const userLogin = async (email: string, password: string) => {
  if (password.length < 8) {
    return {
      error: "Please check your email and password",
    };
  }

  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export default userLogin;
