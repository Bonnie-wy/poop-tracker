"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import userLogin from "@/lib/actions/userLogin";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOnClick = async () => {
    const result = await userLogin(email, password);

    if (result.success) {
      router.push("/home");
    }

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {error && <p>{error}</p>}
      <form>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Poop tracker 💩💩💩
        </h1>
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
