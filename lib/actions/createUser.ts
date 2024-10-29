"use server";

import { createAdminClient } from "../config/appwrite";
import { ID } from "node-appwrite";

type User = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const createUser = async (user: User) => {
  const { email, name, password, confirmPassword } = user;
  if (!email || !name || !password) {
    return {
      error: "Please fill in all fields",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters long",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);

    return { success: true };
  } catch (error) {
    console.log("error", error);
    return {
      error: "Could not register user",
    };
  }
};

export default createUser;
