"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import createUser from "@/lib/actions/createUser";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    console.log("3");
    // const session = await account.createEmailPasswordSession(email, password);
    // setLoggedInUser(await account.get());
  };

  const handleOnClick = async () => {
    console.log("1");
    const result = await createUser({
      email,
      password,
      name,
      confirmPassword: password,
    });

    if (result.error) {
      return setError(result.error);
    }

    if (result.success) {
      console.log("2");
      router.push("/home");
      return;
    }
    // await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center">
      {error && <p>Something went wrong!</p>}
      <h1>Poop tracker 💩💩💩</h1>
      <form>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded w-full py-2 px-3"
            required
            placeholder="xxx@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border rounded w-full py-2 px-3"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleOnClick}
          >
            Login
          </button>

          <p>
            No account?
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
